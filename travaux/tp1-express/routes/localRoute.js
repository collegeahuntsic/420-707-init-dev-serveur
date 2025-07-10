const express = require('express');
const router = express.Router();

// Importer les contrôleurs
const localController = require('../controllers/localController');
const equipementController = require('../controllers/equipementController');

// Importer le middleware de validation
const { validateLocal } = require('../middlewares/validation');


router.get('/locaux', localController.getAllLocaux);
router.get('/locaux/:id', localController.getLocalById);
router.get('/locaux/:id/equipements', equipementController.getEquipementsByLocalId);

router.post('/locaux', validateLocal, localController.createLocal);

router.put('/locaux/:id', validateLocal, localController.updateLocal);
router.put('/locaux/:id', localController.updateLocal);

router.delete('/locaux/:id', localController.deleteLocal);

module.exports = router;