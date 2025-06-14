const express = require('express');
const ProductModel = require('./../db/product_model');
const { validateProduct } = require('./../middleware/validator');

const router = express.Router();


router.get('/products', (req, res) => {
    try {
        const products = ProductModel.getProducts();

        res.json({
            status: 'success',
            data: products
        })
    } catch (error) {
        next(error);
    }
});


router.post('/products', validateProduct, (req, res) => {
    try {
        const product = req.body
        ProductModel.createProduct(product);
    
        return res.status(201).json({
            status: "success",
            data: product
        });
    } catch(error) {
        next(error);
    }
});

module.exports = router;