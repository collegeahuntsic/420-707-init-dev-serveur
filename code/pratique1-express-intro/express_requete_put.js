const express = require('express');
const app = express();

app.use(express.json());

// Base de données fictive
const users = [
  { id: 1, name: 'Alice', email: 'alice@email.com' },
  { id: 2, name: 'Bob', email: 'bob@email.com' }
];

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }

  if (!name && !email) {
    return res.status(400).json({ error: 'Données à mettre à jour manquantes' });
  }

  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;

  res.json({ message: 'Utilisateur mis à jour', user: users[userIndex] });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

