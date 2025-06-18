const mysql = require('mysql2/promise');
const seedDb = require('./seed');
const { dropTables } = require('./drop');

async function createConnection() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'commerce_velo',
    });
}

async function createTable(db) {
    await db.execute(`
    CREATE TABLE IF NOT EXISTS utilisateurs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nom VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      mot_de_passe VARCHAR(255) NOT NULL
    )
  `);
}

const args = process.argv.slice(2);

async function initDB() {
    console.log('Initialisation de la base de données...');

    const db = await createConnection();
    console.log('Connexion réussie.');

    if (args.includes('--reset')) {
        console.log('Réinitialisation de la base de données...');
        await dropTables(db);
    }

    await createTable(db);
    console.log('Table "utilisateurs" prête.');

    await seedDb(db);
    console.log('Données de test insérées.');

    await db.end();
    console.log('Base de données initialisée.');
}

initDB().catch(err => {
    console.error('Erreur :', err.message);
});
