//Tableau vide pour stocker les locaux
const locaux = [];
let nextId = 1;

//Liste complète des locaux
module.exports.getAllLocaux = () => {
  return locaux;
};

//Retourne un local précis par son ID
module.exports.getLocalById = (id) => {
  return locaux.find((local) => local.id === id);
};

//Créé un nouveau local avec ID auto-incrémenté
module.exports.createLocal = (local) => {
  const nouveauLocal = {
    id: nextId++,
    nom: local.nom,
    type: local.type,
    capacite: local.capacite,
  };
  locaux.push(nouveauLocal);
  return nouveauLocal;
};

//Modifie un local existant
module.exports.updateLocal = (id, updatedLocal) => {
  const index = locaux.findIndex(local => local.id === id);
  if (index === -1) return null;

  locaux[index] = { ...locaux[index], ...updatedLocal };
  return locaux[index];
};

//Supprime un local via son ID
module.exports.deleteLocal = (id) => {
  const index = locaux.findIndex(local => local.id === id);
  if (index === -1) return false;

  locaux.splice(index, 1);
  return true;
};
