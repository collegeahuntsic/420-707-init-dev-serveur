<?php require 'config.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

echo "<h1>Welcome, " . htmlspecialchars($_SESSION['username']) . "</h1>";
echo "<a href='add_product.php'>Add New Bike</a> | <a href='logout.php'>Logout</a><hr>";

$stmt = $pdo->prepare("SELECT * FROM bikes WHERE user_id = ?");
$stmt->execute([$_SESSION['user_id']]);
$bikes = $stmt->fetchAll();

foreach ($bikes as $bike) {
    echo "<div>
        <h3>" . htmlspecialchars($bike['name']) . "</h3>
        <p>$" . $bike['price'] . "</p>
        <p>" . htmlspecialchars($bike['description']) . "</p>
        <a href='edit_product.php?id=" . $bike['id'] . "'>Edit</a> |
        <a href='delete_product.php?id=" . $bike['id'] . "' onclick='return confirm(\"Delete?\")'>Delete</a>
    </div><hr>";
}
?>
