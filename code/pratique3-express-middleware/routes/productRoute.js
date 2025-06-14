const productController = require('./../controllers/productController');
const express = require('express');

const router = express.Router();


router.get('/products', productController.getAllProducts)
router.get('/products/:id', productController.getAProduct)
router.post('/products', productController.createProduct)

module.exports = router;