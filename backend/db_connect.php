<?php
/*
File db_connect.php - Chuẩn 100% tài liệu lập trình SePay
https://sepay.vn/lap-trinh-cong-thanh-toan.html#db_connect_php
File này dùng để khởi tạo kết nối CSDL MySQL cho các script của SePay.
*/

require_once __DIR__ . '/db.php';

// Cung cấp biến $conn kết nối MySQL Laragon
if (!isset($conn) || !$conn || $conn->connect_error) {
    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $dbname = "doci_perfume";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        error_log('MySQL connection failed: ' . $conn->connect_error);
        die('Database connection error');
    }
}
?>
