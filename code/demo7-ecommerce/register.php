<?php require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    if ($stmt->execute([$username, $password])) {
        echo "Registered successfully. <a href='login.php'>Login here</a>";
    } else {
        echo "Username may already exist.";
    }
}
?>

<form method="post">
    Username: <input name="username" required><br>
    Password: <input name="password" type="password" required><br>
    <button>Register</button>
</form>
