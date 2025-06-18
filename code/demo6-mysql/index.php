<?php
include 'dbconfig.php';

$sql = "SELECT id, nom, email FROM utilisateurs";
$resultat = $mysql->query($sql);

if ($resultat->num_rows > 0) {
    while ($utilisateur = $resultat->fetch_assoc()) {
        echo "ID: " . $utilisateur["id"] . " - Nom: " . $utilisateur["nom"] . " - Email: " . $utilisateur["email"] . "<br>";
    }
} else {
    echo "Aucun utilisateur trouvé.";
}

$mysql->close();
?>