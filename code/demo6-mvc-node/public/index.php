<?php
require_once '../config/database.php';
require_once '../controllers/UserController.php';

$db = (new Database())->getConnection();
$action = $_GET['action'] ?? 'liste_utilisateurs';

$controller = new UserController($db);

switch ($action) {
    case 'ajouter_utilisateur':
        $controller->create();
        break;
    case 'liste_utilisateurs':
    default:
        $controller->index();
        break;
}
