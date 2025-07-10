// Validation des utilisateurs
module.exports.validateLocal = (req, res, next) => {
  const { nom, type, capacite } = req.body;

  if (!nom || !type || typeof capacite !== 'number') {
    return res.status(400).json({
      status: 'error',
      message: 'Champs manquants ou invalides',
    });
  }

  next();
};
// Validation des équipements
module.exports.validateEquipement = (req, res, next) => {
  const { nom, type, etat, localId } = req.body;

  if (!nom || !type || !etat || (localId !== null && typeof localId !== 'number')) {
    return res.status(400).json({
      status: 'error',
      message: 'Champs manquants ou invalides',
    });
  }

  next();
};