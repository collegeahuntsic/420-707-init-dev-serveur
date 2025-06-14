module.exports.validateProduct = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({
            status: 'error',
            message: 'Product data is required'
        });
    }

    if(!req.body.name || !req.body.price || !req.body.category) {
        return res.status(400).json({
            status: 'error',
            message: 'Product name, price and category are required'
        });
    }

    return next();
}