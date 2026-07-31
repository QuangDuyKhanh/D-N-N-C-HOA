<?php
/*
File check_payment_status.php - Chuẩn 100% tài liệu SePay
https://sepay.vn/lap-trinh-cong-thanh-toan.html#check_payment_status_php
Phục vụ cho Ajax POST lấy kết quả trạng thái đơn hàng.
Dữ liệu trả về dạng JSON: {"payment_status":"Paid"} hoặc {"payment_status":"Unpaid"}
*/

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Include file db.php
require_once('db.php');

// Nhận tham số order_id từ POST, GET hoặc JSON Payload
$order_id = $_POST['order_id'] ?? $_GET['order_id'] ?? $_POST['orderId'] ?? $_GET['orderId'] ?? null;

if (!$order_id) {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    if ($data) {
        $order_id = $data['order_id'] ?? $data['orderId'] ?? null;
    }
}

if (!$order_id) {
    die(json_encode(['payment_status' => 'access_denied', 'message' => 'Missing parameter order_id']));
}

$cleanId = preg_replace('/[^0-9]/', '', (string)$order_id);
$numericId = intval($cleanId);
$orderCode = 'DH' . $cleanId;

if ($conn && !$conn->connect_error) {
    // 1. Kiểm tra bảng tb_orders
    $stmt = $conn->prepare("SELECT payment_status FROM tb_orders WHERE id = ? OR order_code = ?");
    if ($stmt) {
        $stmt->bind_param("is", $numericId, $orderCode);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            $order_details = $result->fetch_object();
            echo json_encode([
                'payment_status' => $order_details->payment_status,
                'paid' => ($order_details->payment_status === 'Paid')
            ]);
            $stmt->close();
            exit;
        }
        $stmt->close();
    }

    // 2. Kiểm tra bảng orders của DOCI
    $stmtDoci = $conn->prepare("SELECT status FROM orders WHERE id = ? OR id = ?");
    if ($stmtDoci) {
        $stmtDoci->bind_param("ss", $order_id, $orderCode);
        $stmtDoci->execute();
        $resDoci = $stmtDoci->get_result();

        if ($resDoci && $resDoci->num_rows > 0) {
            $dociOrder = $resDoci->fetch_assoc();
            $isPaid = ($dociOrder['status'] === 'completed' || $dociOrder['status'] === 'paid' || $dociOrder['status'] === 'Paid');
            $paymentStatus = $isPaid ? 'Paid' : 'Unpaid';
            echo json_encode([
                'payment_status' => $paymentStatus,
                'status' => $dociOrder['status'],
                'paid' => $isPaid
            ]);
            $stmtDoci->close();
            exit;
        }
        $stmtDoci->close();
    }

    echo json_encode(['payment_status' => 'Unpaid', 'paid' => false]);
} else {
    echo json_encode(['payment_status' => 'Unpaid', 'paid' => false]);
}
?>
