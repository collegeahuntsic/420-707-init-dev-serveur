const express = require('express');
const app = express();
const productRouter = require('./routes/productRoute');

app.use(express.json());

// TODO: Ajouter le middleware de morgan pour la gestion des logs


// TODO: Ajouter router
app.use('/api', productRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});