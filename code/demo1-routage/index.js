const generateId = require('./utils/id-generator').generateId;
const express = require('express');
const path = require('path');
const app = express();

const utilisateurs = [
    { id: 1, nom: 'Alice', age: 25 },
    { id: 2, nom: 'Bob', age: 28 },
    { id: 3, nom: 'Charlie', age: 35 },
];

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Bienvenue dans mon API" });
})

app.get('/utilisateurs', (req, res) => {
    const maxAge = parseInt(req.query.age_max);

    const filterdUtilisateurs = utilisateurs.filter(user => {
        return user.age <= maxAge
    });

    res.json(filterdUtilisateurs);
})

app.get('/utilisateurs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const field = req.query.field;

    const utilisateur = utilisateurs.find(user => user.id === id);

    if (!utilisateur) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (field) {
        if (!Object.hasOwn(utilisateur, field)) {
            return res.status(400).json({ message: `Le champ ${field} n'existe pas` });
        }

        return res.status(200).json({ [field]: utilisateur[field] });
    }

    res.status(200).json(utilisateur);
})

app.post('/utilisateurs', (req, res) => {
    const { nom, age } = req.body;

    if (!nom || !age) {
        return res.status(400).json({ message: "Nom et âge sont requis" });
    }

    if (parseInt(age) < 18) {
        return res.status(400).json({ message: "L'utilisateur doit être majeur" });
    }

    const utilisateur = {
        id: generateId(),
        nom: nom,
        age: age
    };
    utilisateurs.push(utilisateur);

    console.log(utilisateurs);

    res.status(201).json({ message: "Utilisateur créé", data: utilisateur });
})

app.put('/utilisateurs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nouveauNom = req.body.nom;

    const utilisateur = utilisateurs.find(u => u.id === id);
    if (!utilisateur) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    utilisateur.nom = nouveauNom;
    res.json({ message: 'Utilisateur mis à jour', utilisateur });
});

app.delete('/utilisateurs/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = utilisateurs.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    utilisateurs.splice(index, 1); // Supprime l'utilisateur
    
    res.status(200).json({ message: `Utilisateur avec ID ${id} supprimé.` });
});

app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;
app.listen(port, () => {
    console.log("Serveur express à l'écoute sur le port " + port);
});