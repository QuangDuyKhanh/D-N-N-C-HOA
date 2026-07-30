<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Tải cấu hình và kết nối MySQL
require_once 'db.php';

if (!$conn || $conn->connect_error) {
    // Nếu kết nối lỗi (ví dụ không chạy Laragon), chuyển sang chế độ dự phòng bằng JSON để không bị lỗi trang
    handleJsonFallback();
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Lấy toàn bộ đơn hàng từ database MySQL Laragon
    $result = $conn->query("SELECT * FROM `orders` ORDER BY `created_at` DESC");
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = [
            'id' => $row['id'],
            'customerName' => $row['customer_name'],
            'customerPhone' => $row['customer_phone'],
            'customerAddress' => $row['customer_address'],
            'customerNote' => $row['customer_note'],
            'paymentMethod' => $row['payment_method'],
            'items' => json_decode($row['items'], true),
            'totalPrice' => (float)$row['total_price'],
            'status' => $row['status'],
            'date' => $row['created_at']
        ];
    }
    echo json_encode($orders, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    $conn->close();
    exit;
}

if ($method === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ']);
        $conn->close();
        exit;
    }
    
    // Cập nhật trạng thái đơn hàng trong MySQL Laragon
    if (isset($data['action']) && $data['action'] === 'update_status') {
        $orderId = $conn->real_escape_string($data['orderId']);
        $newStatus = $conn->real_escape_string($data['status']);
        
        $sql = "UPDATE `orders` SET `status` = '$newStatus' WHERE `id` = '$orderId'";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'message' => 'Cập nhật trạng thái thành công']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Không thể cập nhật đơn hàng: ' . $conn->error]);
        }
        $conn->close();
        exit;
    }
    
    // Cập nhật chi tiết đơn hàng trong MySQL Laragon (Admin Edit)
    if (isset($data['action']) && $data['action'] === 'update_order') {
        $orderId = $conn->real_escape_string($data['orderId']);
        $name = $conn->real_escape_string($data['customerName']);
        $phone = $conn->real_escape_string($data['customerPhone']);
        $address = $conn->real_escape_string($data['customerAddress']);
        $note = $conn->real_escape_string($data['customerNote']);
        $status = $conn->real_escape_string($data['status']);
        $total = (float)$data['totalPrice'];
        
        $sql = "UPDATE `orders` SET 
                `customer_name` = '$name', 
                `customer_phone` = '$phone', 
                `customer_address` = '$address', 
                `customer_note` = '$note', 
                `status` = '$status', 
                `total_price` = $total 
                WHERE `id` = '$orderId'";
                
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'message' => 'Cập nhật đơn hàng thành công']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Lỗi cập nhật CSDL: ' . $conn->error]);
        }
        $conn->close();
        exit;
    }
    
    // Xóa một đơn hàng trong MySQL Laragon (Admin Delete)
    if (isset($data['action']) && $data['action'] === 'delete_order') {
        $orderId = $conn->real_escape_string($data['orderId']);
        
        $sql = "DELETE FROM `orders` WHERE `id` = '$orderId'";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'message' => 'Đã xóa đơn hàng thành công']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Lỗi xóa đơn hàng trong CSDL: ' . $conn->error]);
        }
        $conn->close();
        exit;
    }

    // Xóa toàn bộ đơn hàng trong MySQL Laragon
    if (isset($data['action']) && $data['action'] === 'clear_all') {
        $conn->query("TRUNCATE TABLE `orders`");
        echo json_encode(['success' => true, 'message' => 'Đã xóa toàn bộ đơn hàng']);
        $conn->close();
        exit;
    }
    
    // Thêm đơn hàng mới vào MySQL Laragon
    $id = $conn->real_escape_string(isset($data['id']) ? $data['id'] : 'DH' . time() . rand(10, 99));
    $name = $conn->real_escape_string($data['customerName']);
    $phone = $conn->real_escape_string($data['customerPhone']);
    $address = $conn->real_escape_string($data['customerAddress']);
    $note = $conn->real_escape_string($data['customerNote']);
    $payment = $conn->real_escape_string($data['paymentMethod']);
    $items = $conn->real_escape_string(json_encode($data['items'], JSON_UNESCAPED_UNICODE));
    $total = (float)$data['totalPrice'];
    $status = $conn->real_escape_string(isset($data['status']) ? $data['status'] : 'pending');
    $created_at = date('Y-m-d H:i:s');
    
    $sql = "INSERT INTO `orders` (`id`, `customer_name`, `customer_phone`, `customer_address`, `customer_note`, `payment_method`, `items`, `total_price`, `status`, `created_at`) 
            VALUES ('$id', '$name', '$phone', '$address', '$note', '$payment', '$items', $total, '$status', '$created_at')";
            
    if ($conn->query($sql)) {
        // Đồng thời lưu vào bảng tb_orders chuẩn SePay
        $cleanNumId = preg_replace('/[^0-9]/', '', $id);
        $numId = intval($cleanNumId);
        $tbTotal = (float)$total;
        $orderCode = 'DH' . $cleanNumId;
        $stmtTb = $conn->prepare("INSERT INTO `tb_orders` (`id`, `total`, `payment_status`, `name`, `order_code`) VALUES (?, ?, 'Unpaid', ?, ?) ON DUPLICATE KEY UPDATE `total` = ?");
        if ($stmtTb) {
            $stmtTb->bind_param("idssd", $numId, $tbTotal, $name, $orderCode, $tbTotal);
            $stmtTb->execute();
            $stmtTb->close();
        }

        // Gửi thông báo Telegram khi lưu thành công đơn hàng vào MySQL
        sendTelegramNewOrderNotification($id, $name, $phone, $address, $total, $payment, $note);

        echo json_encode(['success' => true, 'message' => 'Đặt hàng thành công', 'orderId' => $id]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi lưu vào CSDL MySQL: ' . $conn->error]);
    }
    $conn->close();
    exit;
}

// Hàm dự phòng lưu file JSON nếu MySQL Laragon không chạy hoặc chưa bật
function handleJsonFallback() {
    $file = 'orders.json';
    if (!file_exists($file)) {
        file_put_contents($file, json_encode([]));
    }
    
    $method = $_SERVER['REQUEST_METHOD'];
    
    if ($method === 'GET') {
        echo file_get_contents($file);
        exit;
    }
    
    if ($method === 'POST') {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (!$data) {
            echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ']);
            exit;
        }
        
        $orders = json_decode(file_get_contents($file), true) ?: [];
        
        if (isset($data['action']) && $data['action'] === 'update_status') {
            $orderId = $data['orderId'];
            $newStatus = $data['status'];
            $updated = false;
            foreach ($orders as &$order) {
                if ($order['id'] === $orderId) {
                    $order['status'] = $newStatus;
                    $updated = true;
                    break;
                }
            }
            if ($updated) {
                file_put_contents($file, json_encode($orders, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
                echo json_encode(['success' => true, 'message' => 'Cập nhật trạng thái thành công (JSON)']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Không tìm thấy đơn hàng']);
            }
            exit;
        }
        
        if (isset($data['action']) && $data['action'] === 'update_order') {
            $orderId = $data['orderId'];
            $updated = false;
            foreach ($orders as &$order) {
                if ($order['id'] === $orderId) {
                    $order['customerName'] = $data['customerName'];
                    $order['customerPhone'] = $data['customerPhone'];
                    $order['customerAddress'] = $data['customerAddress'];
                    $order['customerNote'] = $data['customerNote'];
                    $order['status'] = $data['status'];
                    $order['totalPrice'] = (float)$data['totalPrice'];
                    $updated = true;
                    break;
                }
            }
            if ($updated) {
                file_put_contents($file, json_encode($orders, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
                echo json_encode(['success' => true, 'message' => 'Cập nhật đơn hàng thành công (JSON)']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Không tìm thấy đơn hàng']);
            }
            exit;
        }

        if (isset($data['action']) && $data['action'] === 'delete_order') {
            $orderId = $data['orderId'];
            $initialCount = count($orders);
            $orders = array_filter($orders, function($o) use ($orderId) {
                return $o['id'] !== $orderId;
            });
            $orders = array_values($orders);
            if (count($orders) < $initialCount) {
                file_put_contents($file, json_encode($orders, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
                echo json_encode(['success' => true, 'message' => 'Đã xóa đơn hàng thành công (JSON)']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Không tìm thấy đơn hàng để xóa']);
            }
            exit;
        }

        if (isset($data['action']) && $data['action'] === 'clear_all') {
            file_put_contents($file, json_encode([]));
            echo json_encode(['success' => true, 'message' => 'Đã xóa toàn bộ đơn hàng (JSON)']);
            exit;
        }
        
        if (!isset($data['id'])) {
            $data['id'] = 'DH' . time() . rand(10, 99);
        }
        if (!isset($data['status'])) {
            $data['status'] = 'pending';
        }
        if (!isset($data['date'])) {
            $data['date'] = date('c');
        }
        
        array_unshift($orders, $data);
        file_put_contents($file, json_encode($orders, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        echo json_encode(['success' => true, 'message' => 'Đặt hàng thành công (JSON)', 'order' => $data]);
        exit;
    }
}

/**
 * Hàm gửi thông báo qua Telegram Bot khi có đơn hàng mới lưu vào MySQL
 */
function sendTelegramNewOrderNotification($orderId, $name, $phone, $address, $total, $paymentMethod, $note) {
    $botToken = "7901768407:AAFnB_x6qR-sW4U5mR_yB-L3kP0j8lV9dZ0";
    $chatId = "6171928373";

    if (empty($botToken) || empty($chatId)) return;

    $formattedTotal = number_format($total, 0, ',', '.') . ' VNĐ';
    $methodText = ($paymentMethod === 'bank') ? 'Chuyển khoản VietQR (SePay)' : 'Thanh toán COD khi nhận hàng';

    $message = "📦 <b>ĐƠN HÀNG MỚI ĐÃ LƯU VÀO MYSQL DATABASE</b>\n";
    $message .= "━━━━━━━━━━━━━━━━━━━━\n";
    $message .= "<b>Mã đơn hàng:</b> #{$orderId}\n";
    $message .= "<b>Khách hàng:</b> {$name}\n";
    $message .= "<b>SĐT:</b> <code>{$phone}</code>\n";
    $message .= "<b>Địa chỉ:</b> {$address}\n";
    $message .= "<b>Tổng tiền:</b> <code>{$formattedTotal}</code>\n";
    $message .= "<b>Phương thức:</b> {$methodText}\n";
    if (!empty($note)) {
        $message .= "<b>Ghi chú:</b> <i>{$note}</i>\n";
    }
    $message .= "━━━━━━━━━━━━━━━━━━━━\n";
    $message .= "<i>Đã đồng bộ vào bảng orders & tb_orders MySQL!</i>";

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
?>
