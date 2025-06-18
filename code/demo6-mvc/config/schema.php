<?php
require_once 'database.php';

$db = (new Database())->getConnection();

// Créer la table utilisateurs
$sqlUtilisateurs = "
CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL
) ENGINE=InnoDB;
";

if ($db->query($sqlUtilisateurs)) {
    echo "Table 'utilisateurs' créée.<br>";
} else {
    echo "Erreur création : " . $db->error;
}
