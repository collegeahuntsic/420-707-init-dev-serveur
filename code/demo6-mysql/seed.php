<?php
include 'dbconfig.php';

$nom = "Jean Dupont";
$email = "jean@example.com";
$motDePasse = password_hash("motdepasse123", PASSWORD_DEFAULT);

$sql = "INSERT INTO utilisateurs (nom, email, motdepasse) VALUES (?, ?, ?)";
$stmt = $mysql->prepare($sql);
$stmt->bind_param("sss", $nom, $email, $motDePasse);

if ($stmt->execute()) {
    echo "Utilisateur ajouté avec succès.";
} else {
    echo "Erreur : " . $stmt->error;
}

$stmt->close();
$mysql->close();
?>
