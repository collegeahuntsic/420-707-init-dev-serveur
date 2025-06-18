<?php
require_once './../models/User.php';

class UserController {
    private $model;

    public function __construct($db) {
        $this->model = new User($db);
    }

    public function index() {
        $users = $this->model->getAll();
        include './../views/users/list_user.php';
    }

    public function create() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->model->create($_POST['nom'], $_POST['email'], $_POST['mot_de_passe']);
            header("Location: index.php?action=liste_utilisateurs");
        } else {
            include './../views/users/add_user.php';
        }
    }
}
