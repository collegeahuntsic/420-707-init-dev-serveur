<?php
$pdo = new PDO('mysql:host=localhost;dbname=auth_demo', 'root', '');
$username = 'testuser';
$password = password_hash('secret123', PASSWORD_DEFAULT); // Hash the password
$stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->execute([$username, $password]);
?>
