<?php
require_once 'database.php';
require_once '../models/User.php';

$db = (new Database())->getConnection();
$utilisateur = new User($db);

$seedUsers = [
    ['Alice', 'alice@example.com', 'secret1'],
    ['Bob', 'bob@example.com', 'secret2'],
    ['Claire', 'claire@example.com', 'secret3'],
];

foreach ($seedUsers as $u) {
    $utilisateur->create($u[0], $u[1], $u[2]);
    echo "Utilisateur {$u[0]} ajouté.<br>";
}
