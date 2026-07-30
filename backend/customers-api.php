<?php
/*
  File: backend/customers-api.php
  API endpoint để quản lý tài khoản khách hàng (đăng ký, đăng nhập, cập nhật hồ sơ, xem đơn hàng)
  Chạy trên Laragon MySQL - Lưu dữ liệu vĩnh viễn vào database
*/

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/db.php';

if (!$conn || $conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed. Running in localStorage mode.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$action = $data['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    // =========================================================
    // ĐĂNG KÝ TÀI KHOẢN MỚI
    // =========================================================
    case 'register':
        $name     = trim($data['name'] ?? '');
        $email    = strtolower(trim($data['email'] ?? ''));
        $phone    = trim($data['phone'] ?? '');
        $password = $data['password'] ?? '';
        $address  = trim($data['address'] ?? '');

        if (!$name || !$email || !$phone || !$password) {
            echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.'], JSON_UNESCAPED_UNICODE);
            break;
        }

        // Kiểm tra email hoặc số điện thoại đã tồn tại
        $checkStmt = $conn->prepare("SELECT id FROM customers WHERE email = ? OR phone = ?");
        $checkStmt->bind_param("ss", $email, $phone);
        $checkStmt->execute();
        $checkStmt->store_result();
        if ($checkStmt->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'This email or phone number is already registered!'], JSON_UNESCAPED_UNICODE);
            $checkStmt->close();
            break;
        }
        $checkStmt->close();

        $userId = 'USR' . time() . rand(100, 999);
        $hashedPass = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO customers (id, name, email, phone, address, password) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $userId, $name, $email, $phone, $address, $hashedPass);

        if ($stmt->execute()) {
            $user = [
                'id'         => $userId,
                'name'       => $name,
                'email'      => $email,
                'phone'      => $phone,
                'address'    => $address,
                'created_at' => date('c')
            ];
            echo json_encode(['success' => true, 'message' => "Account registered successfully! Welcome $name.", 'user' => $user], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['success' => false, 'message' => 'Registration failed. Please try again.'], JSON_UNESCAPED_UNICODE);
        }
        $stmt->close();
        break;

    // =========================================================
    // ĐĂNG NHẬP
    // =========================================================
    case 'login':
        $emailOrPhone = strtolower(trim($data['emailOrPhone'] ?? ''));
        $password = $data['password'] ?? '';

        if (!$emailOrPhone || !$password) {
            echo json_encode(['success' => false, 'message' => 'Please enter your email/phone and password.'], JSON_UNESCAPED_UNICODE);
            break;
        }

        $stmt = $conn->prepare("SELECT * FROM customers WHERE email = ? OR phone = ? LIMIT 1");
        $stmt->bind_param("ss", $emailOrPhone, $emailOrPhone);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $stmt->close();

        if ($user && password_verify($password, $user['password'])) {
            $safeUser = [
                'id'         => $user['id'],
                'name'       => $user['name'],
                'email'      => $user['email'],
                'phone'      => $user['phone'],
                'address'    => $user['address'] ?? '',
                'created_at' => $user['created_at']
            ];
            echo json_encode(['success' => true, 'message' => "Welcome back, {$user['name']}!", 'user' => $safeUser], JSON_UNESCAPED_UNICODE);
        } else {
            // Check demo account fallback
            if (($emailOrPhone === 'khachhang@gmail.com' || $emailOrPhone === '0901234567') && $password === '123456') {
                $demoUser = [
                    'id' => 'USR001',
                    'name' => 'DOCI Customer',
                    'email' => 'khachhang@gmail.com',
                    'phone' => '0901234567',
                    'address' => '123 Nguyen Trai, District 1, Ho Chi Minh City',
                    'created_at' => date('c')
                ];
                // Lưu tài khoản demo vào DB nếu chưa có
                $insertDemo = $conn->prepare("INSERT IGNORE INTO customers (id, name, email, phone, address, password) VALUES (?,?,?,?,?,?)");
                $demoHash = password_hash('123456', PASSWORD_DEFAULT);
                $demoId = 'USR001'; $demoName = 'DOCI Customer'; $demoEmail = 'khachhang@gmail.com'; $demoPhone = '0901234567'; $demoAddr = '123 Nguyen Trai, District 1, Ho Chi Minh City';
                $insertDemo->bind_param("ssssss", $demoId, $demoName, $demoEmail, $demoPhone, $demoAddr, $demoHash);
                $insertDemo->execute();
                $insertDemo->close();
                echo json_encode(['success' => true, 'message' => 'Welcome DOCI Customer!', 'user' => $demoUser], JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(['success' => false, 'message' => 'Incorrect email/phone or password!'], JSON_UNESCAPED_UNICODE);
            }
        }
        break;

    // =========================================================
    // CẬP NHẬT HỒ SƠ KHÁCH HÀNG
    // =========================================================
    case 'update_profile':
        $userId  = $data['id'] ?? '';
        $name    = trim($data['name'] ?? '');
        $phone   = trim($data['phone'] ?? '');
        $address = trim($data['address'] ?? '');

        if (!$userId || !$name || !$phone) {
            echo json_encode(['success' => false, 'message' => 'Full name and phone cannot be empty!'], JSON_UNESCAPED_UNICODE);
            break;
        }

        $stmt = $conn->prepare("UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?");
        $stmt->bind_param("ssss", $name, $phone, $address, $userId);
        if ($stmt->execute() && $stmt->affected_rows >= 0) {
            echo json_encode(['success' => true, 'message' => 'Profile updated successfully!', 'name' => $name, 'phone' => $phone, 'address' => $address], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['success' => false, 'message' => 'Update failed.'], JSON_UNESCAPED_UNICODE);
        }
        $stmt->close();
        break;

    // =========================================================
    // ĐỔI MẬT KHẨU
    // =========================================================
    case 'change_password':
        $userId  = $data['id'] ?? '';
        $oldPass = $data['oldPassword'] ?? '';
        $newPass = $data['newPassword'] ?? '';

        if (!$userId || !$oldPass || !$newPass) {
            echo json_encode(['success' => false, 'message' => 'All password fields are required!'], JSON_UNESCAPED_UNICODE);
            break;
        }

        $stmt = $conn->prepare("SELECT password FROM customers WHERE id = ?");
        $stmt->bind_param("s", $userId);
        $stmt->execute();
        $res = $stmt->get_result();
        $row = $res->fetch_assoc();
        $stmt->close();

        if (!$row || !password_verify($oldPass, $row['password'])) {
            echo json_encode(['success' => false, 'message' => 'Current password is incorrect!'], JSON_UNESCAPED_UNICODE);
            break;
        }

        $newHash = password_hash($newPass, PASSWORD_DEFAULT);
        $update = $conn->prepare("UPDATE customers SET password = ? WHERE id = ?");
        $update->bind_param("ss", $newHash, $userId);
        if ($update->execute()) {
            echo json_encode(['success' => true, 'message' => 'Password changed successfully!'], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['success' => false, 'message' => 'Password update failed.'], JSON_UNESCAPED_UNICODE);
        }
        $update->close();
        break;

    // =========================================================
    // LẤY ĐƠN HÀNG CỦA KHÁCH HÀNG
    // =========================================================
    case 'get_my_orders':
        $email = strtolower(trim($data['email'] ?? ''));
        $phone = trim($data['phone'] ?? '');

        if (!$email && !$phone) {
            echo json_encode(['success' => false, 'message' => 'Email or phone required.'], JSON_UNESCAPED_UNICODE);
            break;
        }

        $stmt = $conn->prepare("SELECT * FROM orders WHERE LOWER(user_email) = ? OR customer_phone = ? ORDER BY created_at DESC");
        $stmt->bind_param("ss", $email, $phone);
        $stmt->execute();
        $result = $stmt->get_result();
        $orders = [];
        while ($row = $result->fetch_assoc()) {
            $orders[] = [
                'id'            => $row['id'],
                'customerName'  => $row['customer_name'],
                'customerPhone' => $row['customer_phone'],
                'customerAddress'=> $row['customer_address'],
                'items'         => json_decode($row['items'], true),
                'totalPrice'    => (float)$row['total_price'],
                'paymentMethod' => $row['payment_method'],
                'status'        => $row['status'],
                'date'          => $row['created_at'],
                'userEmail'     => $row['user_email'] ?? ''
            ];
        }
        $stmt->close();
        echo json_encode(['success' => true, 'orders' => $orders], JSON_UNESCAPED_UNICODE);
        break;

    // =========================================================
    // KIỂM TRA KẾT NỐI DATABASE
    // =========================================================
    case 'ping':
        echo json_encode(['success' => true, 'message' => 'Laragon MySQL connected!', 'db' => 'doci_perfume'], JSON_UNESCAPED_UNICODE);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Unknown action: ' . htmlspecialchars($action)], JSON_UNESCAPED_UNICODE);
        break;
}

$conn->close();
?>
