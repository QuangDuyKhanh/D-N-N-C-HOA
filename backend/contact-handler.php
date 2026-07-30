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
    // Lấy toàn bộ liên hệ từ database MySQL Laragon
    $result = $conn->query("SELECT * FROM `contacts` ORDER BY `created_at` DESC");
    $contacts = [];
    while ($row = $result->fetch_assoc()) {
        $contacts[] = [
            'id' => (int)$row['id'],
            'name' => $row['name'],
            'email' => $row['email'],
            'phone' => $row['phone'],
            'perfume' => $row['perfume'],
            'message' => $row['message'],
            'status' => $row['status'],
            'date' => $row['created_at']
        ];
    }
    echo json_encode($contacts, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    $conn->close();
    exit;
}

if ($method === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        $data = $_POST;
    }
    
    if (!$data) {
        echo json_encode(['success' => false, 'status' => 'error', 'message' => 'Dữ liệu không hợp lệ']);
        $conn->close();
        exit;
    }
    
    // Cập nhật trạng thái tin nhắn trong MySQL Laragon
    if (isset($data['action']) && $data['action'] === 'update_status') {
        $contactId = (int)$data['contactId'];
        $newStatus = $conn->real_escape_string($data['status']);
        
        $sql = "UPDATE `contacts` SET `status` = '$newStatus' WHERE `id` = $contactId";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'status' => 'success', 'message' => 'Cập nhật trạng thái thành công']);
        } else {
            echo json_encode(['success' => false, 'status' => 'error', 'message' => 'Không thể cập nhật tin nhắn: ' . $conn->error]);
        }
        $conn->close();
        exit;
    }
    
    // Xóa một tin nhắn trong MySQL
    if (isset($data['action']) && $data['action'] === 'delete_one') {
        $contactId = (int)$data['contactId'];
        $sql = "DELETE FROM `contacts` WHERE `id` = $contactId";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'status' => 'success', 'message' => 'Xóa tin nhắn thành công']);
        } else {
            echo json_encode(['success' => false, 'status' => 'error', 'message' => 'Không thể xóa tin nhắn: ' . $conn->error]);
        }
        $conn->close();
        exit;
    }
    
    // Xóa toàn bộ tin nhắn trong MySQL Laragon
    if (isset($data['action']) && $data['action'] === 'clear_all') {
        $conn->query("TRUNCATE TABLE `contacts`");
        echo json_encode(['success' => true, 'status' => 'success', 'message' => 'Đã xóa toàn bộ tin nhắn']);
        $conn->close();
        exit;
    }
    
    // Thêm liên hệ mới vào MySQL Laragon
    $name = isset($data['name']) ? trim($data['name']) : '';
    $email = isset($data['email']) ? trim($data['email']) : '';
    $phone = isset($data['phone']) ? trim($data['phone']) : '';
    $perfume = isset($data['perfume']) ? trim($data['perfume']) : '';
    $message = isset($data['message']) ? trim($data['message']) : '';

    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode([
            'status' => 'error',
            'success' => false,
            'message' => 'Vui lòng điền đầy đủ các trường bắt buộc: Họ tên, Email và Lời nhắn.'
        ]);
        $conn->close();
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'status' => 'error',
            'success' => false,
            'message' => 'Địa chỉ email không hợp lệ.'
        ]);
        $conn->close();
        exit;
    }

    $name_esc = $conn->real_escape_string($name);
    $email_esc = $conn->real_escape_string($email);
    $phone_esc = $conn->real_escape_string($phone);
    $perfume_esc = $conn->real_escape_string($perfume);
    $message_esc = $conn->real_escape_string($message);
    $status = 'unread';
    $created_at = date('Y-m-d H:i:s');
    
    $sql = "INSERT INTO `contacts` (`name`, `email`, `phone`, `perfume`, `message`, `status`, `created_at`) 
            VALUES ('$name_esc', '$email_esc', '$phone_esc', '$perfume_esc', '$message_esc', '$status', '$created_at')";
            
    if ($conn->query($sql)) {
        $newId = $conn->insert_id;
        echo json_encode([
            'status' => 'success',
            'success' => true,
            'message' => "Cảm ơn $name! Thông tin liên hệ của bạn đã được gửi thành công. DOCI sẽ phản hồi trong giây lát.",
            'contactId' => $newId
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'success' => false,
            'message' => 'Lỗi lưu vào CSDL MySQL: ' . $conn->error
        ]);
    }
    $conn->close();
    exit;
}

// Hàm dự phòng lưu file JSON nếu MySQL Laragon không chạy hoặc chưa bật
function handleJsonFallback() {
    $file = 'contacts.json';
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
            $data = $_POST;
        }
        
        if (!$data) {
            echo json_encode(['success' => false, 'status' => 'error', 'message' => 'Dữ liệu không hợp lệ']);
            exit;
        }
        
        $contacts = json_decode(file_get_contents($file), true) ?: [];
        
        if (isset($data['action']) && $data['action'] === 'update_status') {
            $contactId = (int)$data['contactId'];
            $newStatus = $data['status'];
            $updated = false;
            foreach ($contacts as &$contact) {
                if ((int)$contact['id'] === $contactId) {
                    $contact['status'] = $newStatus;
                    $updated = true;
                    break;
                }
            }
            if ($updated) {
                file_put_contents($file, json_encode($contacts, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
                echo json_encode(['success' => true, 'status' => 'success', 'message' => 'Cập nhật trạng thái thành công (JSON)']);
            } else {
                echo json_encode(['success' => false, 'status' => 'error', 'message' => 'Không tìm thấy tin nhắn']);
            }
            exit;
        }
        
        if (isset($data['action']) && $data['action'] === 'delete_one') {
            $contactId = (int)$data['contactId'];
            $filteredContacts = [];
            $deleted = false;
            foreach ($contacts as $contact) {
                if ((int)$contact['id'] === $contactId) {
                    $deleted = true;
                } else {
                    $filteredContacts[] = $contact;
                }
            }
            if ($deleted) {
                file_put_contents($file, json_encode($filteredContacts, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
                echo json_encode(['success' => true, 'status' => 'success', 'message' => 'Xóa tin nhắn thành công (JSON)']);
            } else {
                echo json_encode(['success' => false, 'status' => 'error', 'message' => 'Không tìm thấy tin nhắn']);
            }
            exit;
        }
        
        if (isset($data['action']) && $data['action'] === 'clear_all') {
            file_put_contents($file, json_encode([]));
            echo json_encode(['success' => true, 'status' => 'success', 'message' => 'Đã xóa toàn bộ tin nhắn (JSON)']);
            exit;
        }
        
        // Thêm liên hệ mới
        $name = isset($data['name']) ? trim($data['name']) : '';
        $email = isset($data['email']) ? trim($data['email']) : '';
        $phone = isset($data['phone']) ? trim($data['phone']) : '';
        $perfume = isset($data['perfume']) ? trim($data['perfume']) : '';
        $message = isset($data['message']) ? trim($data['message']) : '';

        if (empty($name) || empty($email) || empty($message)) {
            echo json_encode([
                'status' => 'error',
                'success' => false,
                'message' => 'Vui lòng điền đầy đủ các trường bắt buộc: Họ tên, Email và Lời nhắn.'
            ]);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode([
                'status' => 'error',
                'success' => false,
                'message' => 'Địa chỉ email không hợp lệ.'
            ]);
            exit;
        }

        // Tự sinh ID tăng dần cho JSON
        $maxId = 0;
        foreach ($contacts as $c) {
            if (isset($c['id']) && $c['id'] > $maxId) {
                $maxId = (int)$c['id'];
            }
        }
        $newId = $maxId + 1;
        
        $newContact = [
            'id' => $newId,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'perfume' => $perfume,
            'message' => $message,
            'status' => 'unread',
            'date' => date('Y-m-d H:i:s')
        ];
        
        array_unshift($contacts, $newContact);
        file_put_contents($file, json_encode($contacts, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        echo json_encode([
            'status' => 'success',
            'success' => true,
            'message' => "Cảm ơn $name! Thông tin liên hệ của bạn đã được gửi thành công (JSON).",
            'contactId' => $newId
        ]);
        exit;
    }
}
?>
