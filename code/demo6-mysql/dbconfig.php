<?php
$host_server = 'localhost';
$user = 'root';
$pass = '';
$database = 'demo6db';

// Connexion à la base de données
$mysql = new mysqli($host_server, $user, $pass, $database);
if ($mysql->connect_error) {
    die("Échec de la connexion : " . mysqli_connect_error());
}

?>