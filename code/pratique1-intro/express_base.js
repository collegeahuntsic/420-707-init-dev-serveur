const express = require('express');
const app = express();
const PORT = 3000;

// Pour parser le JSON dans les requêtes POST et PUT
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
