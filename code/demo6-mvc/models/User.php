<?php
class User {
    private $db;
    private $table = "utilisateurs";

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        $result = $this->db->query("SELECT * FROM $this->table");
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function create($nom, $email, $mot_de_passe) {
        $hash = password_hash($mot_de_passe, PASSWORD_DEFAULT);
        $stmt = $this->db->prepare("INSERT INTO $this->table (nom, email, mot_de_passe) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nom, $email, $hash);
        return $stmt->execute();
    }
}
