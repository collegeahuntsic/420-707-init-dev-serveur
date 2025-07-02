<?php require 'config.php';
if (!isset($_SESSION['user_id'])) header("Location: login.php");

$id = $_GET['id'];
$stmt = $pdo->prepare("SELECT * FROM bikes WHERE id = ? AND user_id = ?");
$stmt->execute([$id, $_SESSION['user_id']]);
$bike = $stmt->fetch();

if (!$bike) die("Not found.");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $pdo->prepare("UPDATE bikes SET name=?, price=?, description=? WHERE id=? AND user_id=?");
    $stmt->execute([$_POST['name'], $_POST['price'], $_POST['description'], $id, $_SESSION['user_id']]);
    header("Location: dashboard.php");
}
?>

<form method="post">
    Name: <input name="name" value="<?= htmlspecialchars($bike['name']) ?>"><br>
    Price: <input name="price" value="<?= $bike['price'] ?>"><br>
    Description:<br>
    <textarea name="description"><?= htmlspecialchars($bike['description']) ?></textarea><br>
    <button>Update Bike</button>
</form>
