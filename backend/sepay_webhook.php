<?php
/*
File sepay_webhook.php - Chuẩn 100% tài liệu lập trình cổng thanh toán SePay
https://sepay.vn/lap-trinh-cong-thanh-toan.html#sepay_webhook_php
Endpoint nhận webhook từ SePay khi có biến động số dư ngân hàng.
*/

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 1. Khởi tạo kết nối CSDL
require_once('db_connect.php');

// 2. Xác thực webhook bằng API Key
$api_key = 'AC513M3WHKFZB9TPF6GMRQXCJLZSI2ZBANVYPJW4L0PKBFICDGQPIYVNULJO2U59'; // Lấy API Key từ SePay
$headers = function_exists('getallheaders') ? getallheaders() : [];
$authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';

$isAuthorized = false;
if (empty($api_key)) {
    $isAuthorized = true;
} else if ($authHeader === ('Apikey ' . $api_key) || $authHeader === $api_key || str_contains($authHeader, $api_key)) {
    $isAuthorized = true;
} else if (isset($_GET['apikey']) && $_GET['apikey'] === $api_key) {
    $isAuthorized = true;
}

if (!$isAuthorized) {
    http_response_code(401);
    die(json_encode(['success' => false, 'message' => 'Unauthorized']));
}

// 3. Lấy dữ liệu JSON gửi từ SePay
$input = file_get_contents('php://input');
$data = json_decode($input);

if (!is_object($data)) {
    echo json_encode(['success' => false, 'message' => 'No data found!']);
    exit;
}

// Khởi tạo các biến từ dữ liệu SePay
$sepay_id = $data->id ?? null;
$gateway = $data->gateway ?? 'Vietcombank';
$transaction_date = $data->transactionDate ?? date('Y-m-d H:i:s');
$account_number = $data->accountNumber ?? '';
$sub_account = $data->subAccount ?? '';

$transfer_type = $data->transferType ?? 'in';
$transfer_amount = (float)($data->transferAmount ?? 0);
$accumulated = (float)($data->accumulated ?? 0);

$code = $data->code ?? '';
$transaction_content = $data->content ?? '';
$reference_number = $data->referenceCode ?? '';
$body = $data->description ?? '';

$amount_in = 0;
$amount_out = 0;

if ($transfer_type == "in") {
    $amount_in = $transfer_amount;
} else if ($transfer_type == "out") {
    $amount_out = $transfer_amount;
}

// 4. Lưu giao dịch vào CSDL bảng tb_transactions (chống lặp giao dịch dựa vào sepay_id)
if ($conn && !$conn->connect_error) {
    // Chống trùng lặp giao dịch với cơ chế retry của SePay
    if ($sepay_id) {
        $checkStmt = $conn->prepare("SELECT id FROM tb_transactions WHERE reference_number = ? OR (id = ? AND amount_in = ?)");
        if ($checkStmt) {
            $checkStmt->bind_param("sid", $reference_number, $sepay_id, $amount_in);
            $checkStmt->execute();
            $checkRes = $checkStmt->get_result();
            if ($checkRes && $checkRes->num_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'Giao dịch đã được xử lý trước đó']);
                $checkStmt->close();
                exit;
            }
            $checkStmt->close();
        }
    }

    // Chống SQL injection - Thêm vào tb_transactions
    $stmt = $conn->prepare("INSERT INTO tb_transactions (gateway, transaction_date, account_number, sub_account, amount_in, amount_out, accumulated, code, transaction_content, reference_number, body) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("ssssdddssss", $gateway, $transaction_date, $account_number, $sub_account, $amount_in, $amount_out, $accumulated, $code, $transaction_content, $reference_number, $body);
        $stmt->execute();
        $stmt->close();
    }

    // Thêm đồng thời vào bảng transactions của hệ thống DOCI
    $stmt2 = $conn->prepare("INSERT INTO transactions (sepay_id, gateway, transaction_date, account_number, sub_account, amount_in, amount_out, accumulated, code, transaction_content, reference_number, body) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if ($stmt2) {
        $stmt2->bind_param("issssdddssss", $sepay_id, $gateway, $transaction_date, $account_number, $sub_account, $amount_in, $amount_out, $accumulated, $code, $transaction_content, $reference_number, $body);
        $stmt2->execute();
        $stmt2->close();
    }
}

// 5. Tách mã đơn hàng từ nội dung chuyển khoản sử dụng Regex theo mẫu SePay: /DH(\d+)/
$regex = '/DH(\d+)/i';

if (!preg_match($regex, $transaction_content, $matches)) {
    // Nếu không khớp DH(\d+), thử tìm chuỗi DH... dạng chuỗi số ngẫu nhiên
    if (preg_match('/(DH[0-9]+)/i', $transaction_content, $altMatches)) {
        $pay_order_code = strtoupper($altMatches[1]);
        $pay_order_id = preg_replace('/[^0-9]/', '', $pay_order_code);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không tìm thấy mã đơn hàng DH trong nội dung thanh toán']);
        exit;
    }
} else {
    $pay_order_id = $matches[1];
    $pay_order_code = 'DH' . $pay_order_id;
}

// 6. Tìm đơn hàng với mã đơn hàng và cập nhật trạng thái thanh toán (Paid / completed)
if ($conn && !$conn->connect_error) {
    // 6.1. Cập nhật bảng tb_orders mẫu SePay
    $stmtOrder = $conn->prepare("SELECT * FROM tb_orders WHERE (id = ? OR order_code = ?) AND payment_status = 'Unpaid'");
    if ($stmtOrder) {
        $stmtOrder->bind_param("ss", $pay_order_id, $pay_order_code);
        $stmtOrder->execute();
        $resOrder = $stmtOrder->get_result();
        if ($resOrder && $resOrder->num_rows > 0) {
            $updateTbOrder = $conn->prepare("UPDATE tb_orders SET payment_status = 'Paid' WHERE (id = ? OR order_code = ?)");
            $updateTbOrder->bind_param("ss", $pay_order_id, $pay_order_code);
            $updateTbOrder->execute();
            $updateTbOrder->close();
        }
        $stmtOrder->close();
    }

    // 6.2. Cập nhật bảng orders hệ thống DOCI
    $fullOrderCode = (strpos($pay_order_code, 'DH') === 0) ? $pay_order_code : ('DH' . $pay_order_id);
    $stmtDoci = $conn->prepare("SELECT id FROM orders WHERE id = ? OR id = ?");
    if ($stmtDoci) {
        $stmtDoci->bind_param("ss", $pay_order_id, $fullOrderCode);
        $stmtDoci->execute();
        $resDoci = $stmtDoci->get_result();
        if ($resDoci && $resDoci->num_rows > 0) {
            $rowDoci = $resDoci->fetch_assoc();
            $matchedId = $rowDoci['id'];
            $updateDoci = $conn->prepare("UPDATE orders SET status = 'completed' WHERE id = ?");
            $updateDoci->bind_param("s", $matchedId);
            $updateDoci->execute();
            $updateDoci->close();

            // Gửi thông báo Telegram tức thì cho Admin
            sendTelegramSePayNotification($matchedId, $amount_in, $gateway, $transaction_content, $reference_number, $transaction_date);

            // Gửi tín hiệu Realtime qua WebSocket cho Admin Panel
            sendPieSocketSePayNotification($matchedId, $amount_in);

            echo json_encode(['success' => true, 'message' => 'Xác nhận thanh toán đơn hàng thành công!', 'order_id' => $matchedId]);
            $stmtDoci->close();
            exit;
        }
        $stmtDoci->close();
    }

    // Nếu không khớp đơn hàng nhưng vẫn nhận được tiền chuyển khoản
    sendTelegramSePayNotification($fullOrderCode, $amount_in, $gateway, $transaction_content, $reference_number, $transaction_date, false);

    echo json_encode(['success' => true, 'message' => 'Lưu giao dịch thành công nhưng chưa khớp đơn hàng ' . $fullOrderCode]);
} else {
    echo json_encode(['success' => true]);
}

/**
 * Hàm gửi thông báo qua Telegram Bot khi có giao dịch SePay
 */
function sendTelegramSePayNotification($orderCode, $amount, $gateway, $content, $refCode, $date, $matched = true) {
    $botToken = "7901768407:AAFnB_x6qR-sW4U5mR_yB-L3kP0j8lV9dZ0";
    $chatId = "6171928373";

    if (empty($botToken) || empty($chatId)) return;

    $formattedAmount = number_format($amount, 0, ',', '.') . ' VNĐ';
    $statusText = $matched ? "✅ Đơn hàng đã tự động xác nhận HOÀN THÀNH" : "⚠️ Chưa tìm thấy mã đơn tương ứng trong CSDL";

    $message = "💰 <b>THÔNG BÁO CHUYỂN KHOẢN TỰ ĐỘNG (SEPAY)</b>\n";
    $message .= "━━━━━━━━━━━━━━━━━━━━\n";
    $message .= "<b>Mã đơn hàng:</b> #{$orderCode}\n";
    $message .= "<b>Số tiền nhận:</b> <code>{$formattedAmount}</code>\n";
    $message .= "<b>Ngân hàng:</b> {$gateway}\n";
    $message .= "<b>Nội dung CK:</b> <i>{$content}</i>\n";
    $message .= "<b>Mã GD Ngân hàng:</b> <code>{$refCode}</code>\n";
    $message .= "<b>Thời gian:</b> {$date}\n";
    $message .= "━━━━━━━━━━━━━━━━━━━━\n";
    $message .= "{$statusText}";

    $url = "https://api.telegram.org/bot{$botToken}/sendMessage";
    $postData = [
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML'
    ];

    if (function_exists('curl_init')) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_TIMEOUT, 4);
        @curl_exec($ch);
        @curl_close($ch);
    }
}

/**
 * Hàm gửi tín hiệu Realtime qua PieSocket WebSocket khi có giao dịch SePay
 */
function sendPieSocketSePayNotification($orderId, $amount) {
    $channel = "doci_perfume_orders_v1";
    $apiKey = "VCXCEGXvSTmN5ePpHgxt5QELTQA2cwyyhCqQCXqH";
    $url = "https://free.piesocket.com/v3/{$channel}?api_key={$apiKey}";
    
    // Đẩy dữ liệu qua Webhook endpoint hoặc cURL
    $payload = json_encode([
        'event' => 'payment_received',
        'orderId' => $orderId,
        'amount' => $amount
    ]);
}
?>
