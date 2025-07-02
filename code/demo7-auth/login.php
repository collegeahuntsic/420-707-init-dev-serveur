<?php
session_start();

// Connexion à la base de données avec mysqli
$mysqli = new mysqli('localhost', 'root', '', 'auth_demo');
if ($mysqli->connect_error) {
    die('Erreur de connexion : ' . $mysqli->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération des données du formulaire
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Préparation de la requête pour récupérer l'utilisateur
    $stmt = $mysqli->prepare("SELECT id, username, password FROM users WHERE username = ?");
    if (!$stmt) {
        die('Échec de la préparation : ' . $mysqli->error);
    }
    $stmt->bind_param('s', $username);
    $stmt->execute();

    // Récupération du résultat
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    // Fermeture de la connexion
    $stmt->close();
    $mysqli->close();

    // Vérification du mot de passe
    if ($user && $password == $user['password']) {
        // Si l'authentification réussit, on stocke les infos en session
        $_SESSION['user_id']  = $user['id'];
        $_SESSION['username'] = $user['username'];
        header("Location: dashboard.php");
        exit;
    } else {
        // En cas d'échec, on affiche un message d'erreur
        echo "Nom d'utilisateur ou mot de passe invalide.";
    }
}

?>

<form method="post" action="login.php">
    <h2>Connexion</h2>
    <label for="username">Nom d'utilisateur :</label>
    <input type="text" id="username" name="username" required>

    <label for="password">Mot de passe :</label>
    <input type="password" id="password" name="password" required>

    <button type="submit">Se connecter</button>
</form>