const BD = []

module.exports.getAllProducts = () => {
    return BD;
}

module.exports.getAProduct = (id) => {
    const product = BD.find((product) => product.id === id);

    return product;
}

module.exports.createProduct = (product) => {
    const newProduct = product;
    newProduct.id = BD.length + 1;
    BD.push(newProduct);

    return newProduct;
}