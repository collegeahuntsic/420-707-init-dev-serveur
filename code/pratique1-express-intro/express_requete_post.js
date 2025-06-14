const express = require('express');
const app = express();

app.use(express.json());

// Base de données fictive
const users = [
  { id: 1, name: 'Alice', email: 'alice@email.com' },
  { id: 2, name: 'Bob', email: 'bob@email.com' }
];

const generateId = () => users.length ? users[users.length - 1].id + 1 : 1;

app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Nom et email requis' });
  }

  const newUser = { id: generateId(), name, email };

  users.push(newUser);

  res.status(201).json({ message: 'Utilisateur créé', user: newUser });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
