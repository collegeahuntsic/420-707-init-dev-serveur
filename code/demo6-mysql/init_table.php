<?php

include 'dbconfig.php';

// Créer la table si elle n'existe pas
$sql = "CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    motdepasse VARCHAR(255) NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)"; 
if ($mysql->query($sql)) {
    echo "Table utilisateurs créée avec succès ou déjà existante.";
} else {
    echo "Erreur lors de la création de la table : " . mysqli_error($connexion);
}

// Fermer la connexion
$mysql->close();

// // Rediriger vers la page d'accueil
// header("Location: index.php");
// exit();

?>