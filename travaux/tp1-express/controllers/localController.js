const localModel = require('../models/localModel');
const { sendResponse } = require('../utils/response');


// Récupère tous les locaux
module.exports.getAllLocaux = (req, res) => {
  const locaux = localModel.getAllLocaux();
  sendResponse(res, 200, 'success', 'Liste des locaux récupérée avec succès', locaux);
};

// Récupère un local par son ID
module.exports.getLocalById = (req, res) => {
  const id = parseInt(req.params.id);
  const local = localModel.getLocalById(id);

  if (!local) {
    return sendResponse(res, 404, 'error', 'Local non trouvé');
  }
  sendResponse(res, 200, 'success', 'Local trouvé', local);
};

// Crée un nouveau local
module.exports.createLocal = (req, res) => {
  const { nom, type, capacite } = req.body;

  if (!nom || !type || typeof capacite !== 'number') {
    return sendResponse(res, 400, 'error', 'Champs manquants ou invalides');
  }

  const nouveauLocal = localModel.createLocal({ nom, type, capacite });
  sendResponse(res, 201, 'success', 'Local créé avec succès', nouveauLocal);
};

// Met à jour un local existant
module.exports.updateLocal = (req, res) => {
  const id = parseInt(req.params.id);
  const { nom, type, capacite } = req.body;

  const updatedData = {};
  if (nom) updatedData.nom = nom;
  if (type) updatedData.type = type;
  if (typeof capacite === 'number') updatedData.capacite = capacite;

  const updated = localModel.updateLocal(id, updatedData);
  if (!updated) {
    return sendResponse(res, 404, 'error', 'Local non trouvé pour mise à jour');
  }
  sendResponse(res, 200, 'success', 'Local mis à jour avec succès', updated);
};

// Supprime un local par son ID
module.exports.deleteLocal = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = localModel.deleteLocal(id);

  if (!deleted) {
    return sendResponse(res, 404, 'error', 'Local non trouvé pour suppression');
  }
  sendResponse(res, 200, 'success', 'Local supprimé avec succès');
};