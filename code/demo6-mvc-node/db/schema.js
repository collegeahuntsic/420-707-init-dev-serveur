const { getConnection } = require('./connection');

async function createTables(db) {
    // Table utilisateurs
    await db.execute(`
    CREATE TABLE IF NOT EXISTS utilisateurs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nom VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      mot_de_passe VARCHAR(255) NOT NULL
    )
  `);
    console.log('Table utilisateur créée.');

    // Table commandes
    await db.execute(`
    CREATE TABLE IF NOT EXISTS commandes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      utilisateur_id INT NOT NULL,
      date_commande DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
    )
  `);
    console.log('Table commande créée.');

    // Table items
    await db.execute(`
    CREATE TABLE IF NOT EXISTS items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      commande_id INT NOT NULL,
      nom VARCHAR(100),
      quantite INT,
      prix DECIMAL(10,2),
      FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE
    )
  `);
    console.log('Table item créée.');

    await db.end();
}

module.exports = {
    createDatabase,
    createTables
};
