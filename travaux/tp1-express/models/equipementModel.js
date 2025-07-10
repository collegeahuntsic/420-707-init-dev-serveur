//Table pour stocker les équipements
const equipements = [];
let nextId = 1;

// Récupérer tous les équipements
module.exports.getAllEquipements = () => {
  return equipements;
}

// Récupérer un équipement par son ID
module.exports.getEquipementById = (id) => {
  return equipements.find((equipement) => equipement.id === id);
};

// Créer un nouvel équipement
module.exports.createEquipement = (equipement) => {
  const nouveauEquipement = {
    id: nextId++,
    nom: equipement.nom,
    type: equipement.type,
    etat: equipement.etat,
    localId: equipement.localId,
  };
  equipements.push(nouveauEquipement);
  return nouveauEquipement;
};

// Mettre à jour un équipement existant
module.exports.updateEquipement = (id, updatedData) => {
  const index = equipements.findIndex((eq) => eq.id === id);
  if (index === -1) return null;

  equipements[index] = { ...equipements[index], ...updatedData };
  return equipements[index];
};

// Supprimer un équipement par son ID
module.exports.deleteEquipement = (id) => {
  const index = equipements.findIndex(e => e.id === id);
  if (index === -1) return false;

  equipements.splice(index, 1);
  return true;
};

// Assigner un équipement à un local
module.exports.assignEquipementToLocal = (equipementId, localId) => {
  const equipement = equipements.find(eq => eq.id === equipementId);
  if (!equipement) return null;

  equipement.localId = localId;
  return equipement;
};

// Récupérer tous les équipements d'un local spécifique
module.exports.getEquipementsByLocalId = (localId) => {
  return equipements.filter(equipement => equipement.localId === localId);
};