const express = require('express');
const morgan = require('morgan');
const { sendResponse } = require('./utils/response');

// Importer les routes
const localRoute = require('./routes/localRoute');
const equipementRoute = require('./routes/equipementRoute');

// Initialiser l'application Express
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
const apiRouter = express.Router();
apiRouter.use(localRoute);
apiRouter.use(equipementRoute);
app.use('/api', apiRouter);

// Gestion des routes non trouvées
app.use((req, res) => {
  sendResponse(404, 'error', 'Route non trouvée');
});

// Middleware de gestion d’erreur
app.use((err, req, res, next) => {
  console.error(err.stack);
  sendResponse(res, 500, 'error', 'Erreur interne du serveur');
});

// Lancer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours sur le port ${port}`);
});
