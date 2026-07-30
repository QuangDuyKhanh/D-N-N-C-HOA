<?php
// db.php - Cấu hình và kết nối CSDL MySQL (Laragon) cho DOCI Perfume

$host = '127.0.0.1';
$username = 'root';
$password = ''; // Mặc định trong Laragon là rỗng
$dbname = 'doci_perfume';

// 1. Kết nối MySQL
$conn = @new mysqli($host, $username, $password);

if (!$conn->connect_error) {
    // 2. Tự động tạo Database nếu chưa có
    $conn->query("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $conn->select_db($dbname);

    // 3. Tự động tạo Bảng orders nếu chưa có
    $orders_table = "CREATE TABLE IF NOT EXISTS `orders` (
        `id` VARCHAR(50) NOT NULL PRIMARY KEY,
        `customer_name` VARCHAR(255) NOT NULL,
        `customer_phone` VARCHAR(50) NOT NULL,
        `customer_address` TEXT NOT NULL,
        `customer_note` TEXT,
        `payment_method` VARCHAR(50) NOT NULL,
        `items` TEXT NOT NULL, -- Lưu trữ dạng JSON string của các sản phẩm mua
        `total_price` DECIMAL(15,2) NOT NULL,
        `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
        `created_at` DATETIME NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $conn->query($orders_table);

    // 4. Bảng customers - Lưu tài khoản khách hàng đã đăng ký
    $customers_table = "CREATE TABLE IF NOT EXISTS `customers` (
        `id` VARCHAR(50) NOT NULL PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `email` VARCHAR(255) NOT NULL UNIQUE,
        `phone` VARCHAR(50) NOT NULL,
        `address` TEXT,
        `password` VARCHAR(255) NOT NULL,
        `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $conn->query($customers_table);

    // Thêm cột user_email vào orders nếu chưa có (để liên kết đơn hàng với khách hàng)
    $conn->query("ALTER TABLE `orders` ADD COLUMN IF NOT EXISTS `user_email` VARCHAR(255) DEFAULT NULL AFTER `customer_note`");

    // 5. Tự động tạo Bảng contacts nếu chưa có
    $contacts_table = "CREATE TABLE IF NOT EXISTS `contacts` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `email` VARCHAR(255) NOT NULL,
        `phone` VARCHAR(50),
        `perfume` VARCHAR(255),
        `message` TEXT NOT NULL,
        `status` VARCHAR(50) NOT NULL DEFAULT 'unread',
        `created_at` DATETIME NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $conn->query($contacts_table);

    // 6. Tự động tạo Bảng transactions & tb_transactions lưu nhật ký giao dịch ngân hàng từ SePay
    $transactions_table = "CREATE TABLE IF NOT EXISTS `transactions` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `sepay_id` INT DEFAULT NULL,
        `gateway` VARCHAR(100) DEFAULT NULL,
        `transaction_date` DATETIME DEFAULT NULL,
        `account_number` VARCHAR(100) DEFAULT NULL,
        `sub_account` VARCHAR(100) DEFAULT NULL,
        `amount_in` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
        `amount_out` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
        `accumulated` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
        `code` VARCHAR(250) DEFAULT NULL,
        `transaction_content` TEXT DEFAULT NULL,
        `reference_number` VARCHAR(255) DEFAULT NULL,
        `body` TEXT DEFAULT NULL,
        `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $conn->query($transactions_table);

    $tb_transactions = "CREATE TABLE IF NOT EXISTS `tb_transactions` (
        `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `gateway` VARCHAR(100) NOT NULL,
        `transaction_date` DATETIME NOT NULL,
        `account_number` VARCHAR(100) DEFAULT NULL,
        `sub_account` VARCHAR(250) DEFAULT NULL,
        `amount_in` DECIMAL(20,2) NOT NULL DEFAULT 0.00,
        `amount_out` DECIMAL(20,2) NOT NULL DEFAULT 0.00,
        `accumulated` DECIMAL(20,2) NOT NULL DEFAULT 0.00,
        `code` VARCHAR(250) DEFAULT NULL,
        `transaction_content` TEXT DEFAULT NULL,
        `reference_number` VARCHAR(255) DEFAULT NULL,
        `body` TEXT DEFAULT NULL,
        `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    $conn->query($tb_transactions);

    // 6. Tự động tạo Bảng tb_orders chuẩn 100% mẫu SePay
    $tb_orders = "CREATE TABLE IF NOT EXISTS `tb_orders` (
        `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `total` DECIMAL(20,2) NOT NULL DEFAULT 0.00,
        `payment_status` ENUM('Unpaid','Paid','Cancelled','Refunded') NOT NULL DEFAULT 'Unpaid',
        `name` VARCHAR(250) DEFAULT NULL,
        `order_code` VARCHAR(50) DEFAULT NULL,
        `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    $conn->query($tb_orders);
}
?>
