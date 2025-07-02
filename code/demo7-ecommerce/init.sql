CREATE DATABASE bike_ecommerce;
USE bike_ecommerce;

-- Création des tables
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE bikes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100),
    price DECIMAL(10,2),
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insertion de données dans la table users
INSERT INTO users (username, password) VALUES
('alice', 'password_hash1'),
('bob', 'password_hash2'),
('charlie', 'password_hash3');

-- Insertion de données dans la table bikes
INSERT INTO bikes (user_id, name, price, description) VALUES
(1, 'Trek FX 3 Disc', 799.99, 'Vélo hybride polyvalent avec freins à disque.'),
(1, 'Specialized Sirrus X 4.0', 1050.00, 'Idéal pour la route et les chemins de gravier.'),
(2, 'Cannondale Quick 4', 700.00, 'Vélo rapide et confortable pour la ville.'),
(3, 'Giant Escape 3', 550.50, 'Excellent rapport qualité/prix pour les trajets quotidiens.');
