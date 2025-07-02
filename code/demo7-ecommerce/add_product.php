<?php require 'config.php';
if (!isset($_SESSION['user_id'])) header("Location: login.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $pdo->prepare("INSERT INTO bikes (user_id, name, price, description) VALUES (?, ?, ?, ?)");
    $stmt->execute([$_SESSION['user_id'], $_POST['name'], $_POST['price'], $_POST['description']]);
    header("Location: dashboard.php");
}
?>

<form method="post">
    Name: <input name="name" required><br>
    Price: <input name="price" type="number" step="0.01" required><br>
    Description:<br>
    <textarea name="description"></textarea><br>
    <button>Add Bike</button>
</form>
