const Router = require('express').Router();
const categories = require('./../db/categories.js');


Router.get('/api/categories', (req, res) => {
    res.json(categories);
});

module.exports = Router;
