<?php
require_once 'utils/Response.php';
require_once 'config/Database.php';
require_once 'config/Router.php';
require_once 'config/Controller.php';
require_once 'controllers/UserController.php';

// Racine de l'API (nom du dossier servi par le serveur web)
// ex: http://localhost/api-mvc <-- '/api-mvc' est le nom du dossier
$BASE_PATH = '/api-mvc';

$router = new Router($BASE_PATH);

function registerRoutes() {
    global $router;
    
    $router->add('GET', '/users', function () {
        getUserController()->getUsers();
    });
    
    $router->add('GET', '/users/{id}', function ($id) {
        getUserController()->getUser($id);
    });
    
    $router->add('POST', '/users', function () {
        getUserController()->createUser();
    });
    
    $router->add('PUT', '/users/{id}', function ($id) {
        getUserController()->update($id);
    });
    
    $router->add('DELETE', '/users/{id}', function ($id) {
        getUserController()->delete($id);
    });
}

// Gestion des erreurs
try {
    registerRoutes();
    $router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
} catch (Exception $e) {
    sendError($e->getMessage(), 500);
}
