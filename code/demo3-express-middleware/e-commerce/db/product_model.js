const ProductDB = [
    { id: 1, name: 'Argon 18', price: 10, category: 1, instock: true },
    { id: 2, name: 'Specialized', price: 20, category: 1, instock: true },
    { id: 3, name: 'Garmin', price: 30, category: 2, instock: false },
    { id: 4, name: 'DeRosa', price: 40, category: 1, instock: false },
    { id: 5, name: 'VTT', price: 50, category: 5, instock: true },
]

module.exports.createProduct = (product) => {
    product.id = ProductDB.length + 1
    ProductDB.push(product);

    return product;
}

module.exports.getProducts = (index) => {
    return ProductDB.slice();
}

module.exports.getProduct = (index) => {
    return ProductDB[index];
}

module.exports.editProduct = (index, product) => {
    ProductDB[index] = product;
    return true;
}

module.exports.removeProduct = (index) => {
    let removedProduct = ProductDB.splice(index, 1);
    return removedProduct[0];
}