const equipementModel = require('../models/equipementModel');
const { sendResponse } = require('../utils/response');

// Récupère tous les équipements
module.exports.getAllEquipements = (req, res) => {
  const equipements = equipementModel.getAllEquipements();
  sendResponse(res, 200, 'success', 'Liste des équipements récupérée avec succès', equipements);
};

// Récupère un équipement par son ID
module.exports.getEquipementById = (req, res) => {
  const id = parseInt(req.params.id);
  const equipement = equipementModel.getEquipementById(id);

  if (!equipement) {
    return sendResponse(res, 404, 'error', 'Équipement non trouvé');
  }
  sendResponse(res, 200, 'success', 'Équipement trouvé', equipement);
};

// Crée un nouvel équipement
module.exports.createEquipement = (req, res) => {
  const { nom, type, etat, localId } = req.body;
  if (!nom || !type || !etat || !localId) {
    return sendResponse(res, 400, 'error', 'Champs manquants ou invalides');
  }
  const nouveauEquipement = equipementModel.createEquipement({ nom, type, etat, localId });
  sendResponse(res, 201, 'success', 'Équipement créé avec succès', nouveauEquipement);
};

// Met à jour un équipement existant
module.exports.updateEquipement = (req, res) => {
  const id = parseInt(req.params.id);
  const { nom, type, etat, localId } = req.body;

  const updatedData = {};
  if (nom) updatedData.nom = nom;
  if (type) updatedData.type = type;
  if (etat) updatedData.etat = etat;
  if (localId) updatedData.localId = localId;

  const updated = equipementModel.updateEquipement(id, updatedData);
  if (!updated) {
    return sendResponse(res, 404, 'error', 'Équipement non trouvé pour mise à jour');
  }
  sendResponse(res, 200, 'success', 'Équipement mis à jour avec succès', updated);
};

// Supprime un équipement par son ID
module.exports.deleteEquipement = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = equipementModel.deleteEquipement(id);

  if (!deleted) {
    return sendResponse(res, 404, 'error', `Aucun équipement trouvé avec l'id ${id}`);
  }
  sendResponse(res, 200, 'success', `Équipement avec l'id ${id} supprimé avec succès`);
};

// Assigne un équipement à un local
module.exports.assignEquipementToLocal = (req, res) => {
  const equipementId = parseInt(req.params.id);
  const localId = parseInt(req.params.localId);

  const updated = equipementModel.assignEquipementToLocal(equipementId, localId);

  if (!updated) {
    return sendResponse(res, 404, 'error', `Aucun équipement trouvé avec l'id ${equipementId}`);
  }
  sendResponse(res, 200, 'success', `Équipement ${equipementId} assigné au local ${localId}`, updated);
};

// Récupère tous les équipements d'un local spécifique
module.exports.getEquipementsByLocalId = (req, res) => {
  const localId = parseInt(req.params.id);
  const equipements = equipementModel.getEquipementsByLocalId(localId);

  if (equipements.length === 0) {
    return sendResponse(res, 404, 'error', `Aucun équipement trouvé pour le local avec l'id ${localId}`);
  }
  sendResponse(res, 200, 'success', `Équipements trouvés pour le local ${localId}`, equipements);
};