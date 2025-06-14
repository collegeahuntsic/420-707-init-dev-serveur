const Router = require('express').Router();
const { products, createProduct } = require('../db/products.js');


Router.get('/api/products', (req, res) => {
    const { category } = req.query;

    if (category) {
        const filteredProducts = products.filter(product => product.category == category);
        return res.json(filteredProducts);
    }
    res.json(products);
});

Router.get('/api/products/search', (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Le paramètre "q" est nécessaire pour la recherche' });
    }

    if (q) {
        const filteredProducts = products.filter(product => product.nom.toLowerCase().includes(q.toLowerCase()));
        return res.json(filteredProducts);
    }
    res.json(products);
});

Router.post('/api/products', (req, res) => {
    const { nom, prix, category } = req.body;

    console.log(products);

    if (!nom || !prix || !category) {
        return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    let newProduct = createProduct(nom, prix, category);
    
    console.log(products);
    console.log(newProduct);
    res.status(201).json(newProduct);
});

module.exports = Router;