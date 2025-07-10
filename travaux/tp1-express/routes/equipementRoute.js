const express = require('express');
const router = express.Router();

// Importer les contrôleurs
const equipementController = require('../controllers/equipementController');

// Importer le middleware de validation
const { validateEquipement } = require('../middlewares/validation');

router.get('/equipements', equipementController.getAllEquipements);
router.get('/equipements/:id', equipementController.getEquipementById);

router.post('/equipements', validateEquipement, equipementController.createEquipement);

router.put('/equipements/:id', validateEquipement, equipementController.updateEquipement);
router.put('/equipements/:id/assigner/:localId', equipementController.assignEquipementToLocal);

router.delete('/equipements/:id', equipementController.deleteEquipement);

module.exports = router;