const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Pour pouvoir lire les corps JSON des requêtes

// Base de données fictive
const etudiants = [
  { id: 1, nom: 'Alice', email: 'alice@email.com' },
  { id: 2, nom: 'Bob', email: 'bob@email.com' },
];

// GET - Récupérer tous les étudiants
app.get('/etudiants', (req, res) => {
  res.json(etudiants);
});

// GET - Récupérer un étudiant spécifique par ID
app.get('/etudiants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const etudiant = etudiants.find(e => e.id === id);

  if (!etudiant) {
    return res.status(404).json({ message: 'Étudiant non trouvé' });
  }

  res.json(etudiant);
});

// POST - Ajouter un nouvel étudiant
app.post('/etudiants', (req, res) => {
  const { nom, email } = req.body;

  if (!nom || !email) {
    return res.status(400).json({ error: 'Nom et email requis' });
  }

  const nouveau = { id: etudiants.length + 1, nom: nom, email: email };

  etudiants.push(nouveau);

  res.status(201).json({ message: 'Nouvel étudiant créé', user: nouveau });
});

// PUT - Modifier un étudiant existant
app.put('/etudiants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nom, email } = req.body;

  const etudiant = etudiants.find(e => e.id === id);

  if (!etudiant) {
    return res.status(404).json({ message: 'Étudiant non trouvé' });
  }

  etudiant.nom = nom || etudiant.nom;
  etudiant.email = email || etudiant.email;

  res.json({ message: 'Étudiant mis à jour', user: etudiant });
});

// DELETE - Supprimer un étudiant
app.delete('/etudiants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = etudiants.findIndex(e => e.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Étudiant non trouvé' });
  }
  
  const etudiantSupprime = users.splice(index, 1);
  res.status(200).json({ message: 'Étudiant supprimé', user: etudiantSupprime[0] });
});

// Middleware pour gérer les routes non trouvées (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
