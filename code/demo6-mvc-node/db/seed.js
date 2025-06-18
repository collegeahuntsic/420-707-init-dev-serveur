const { faker } = require('@faker-js/faker')

const NB_UTILISATEURS = 10;

async function seedDb(db) {
    for (let i = 0; i < NB_UTILISATEURS; i++) {
        const nom = faker.person.fullName();
        const email = faker.internet.email();
        const password = faker.internet.password(10, false, /[a-zA-Z0-9]/);

        await db.execute(
            'INSERT INTO utilisateurs (nom, email, mot_de_passe) VALUES (?, ?, ?)',
            [nom, email, password]
        );
    }

    console.log(`Utilisateurs ajouté.`);
}

module.exports = seedDb;