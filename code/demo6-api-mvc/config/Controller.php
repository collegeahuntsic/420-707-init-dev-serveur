<?php

const USER = 'user';

function getConnection() {
    $db = new Database();
    return $db->getConnection();
}

function getUserController() {
    return getController(USER);
}

function getController($entity) {
    switch ($entity) {
        case USER:
            return new UserController(getConnection());
        // Ajouter d'autres contrôleurs ici si nécessaire
        default:
            throw new Exception("Contrôleur non trouvé pour l'entité: $entity");
    }
}
