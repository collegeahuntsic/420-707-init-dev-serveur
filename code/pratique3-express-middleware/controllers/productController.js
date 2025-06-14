const productModel = require('./../models/products');

module.exports.getAProduct = (req, res) => {
    let product = productModel.getAProduct(req.params.id);
    res.status(200).json({
        status: 'success',
        message: 'A single product',
        data: product
    });
}

module.exports.getAllProducts = (req, res) => {
    let products = productModel.getAllProducts();
    res.status(200).json({
        status: 'success',
        message: 'All products',
        data: products
    });
}

const isValid = (product) => {
    if (!product) return false;

    const hasRequiredFields = (product.name && product.description && product.price && product.available && product.category && product.image);
    const missingFields = [
        'name', 
        'description', 
        'price', 
        'available', 
        'category', 
        'image'
    ].filter(field => !Object.hasOwn(product, field));
    
    if (!hasRequiredFields) {
        return {
            result: false,
            message: `Missing required fields: ${missingFields}`
        }
    }

    const isValidPrice = parseFloat(product.price) > 0;
    if (!isValidPrice) return {
        result: false,
        message: 'Price must be a positive number'
    }

    return {
        result: true,
        message: 'Product is valid'
    };
}

module.exports.createProduct = (req, res) => {
    let product = req.body;
    const validation = isValid(product);
    if (!validation.result) {
        return res.status(400).json({
            status: "error",
            message: validation.message,
            data: null
        })
    }

    let response = productModel.createProduct(product);
    res.status(201).json({
        status: 'success',
        message: 'New product created',
        data: response
    });
}