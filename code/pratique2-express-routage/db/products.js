
const products = [
    { id: 1, nom: 'Argon 18', prix: 10, category: 1, disponible: true },
    { id: 2, nom: 'Specialized', prix: 20, category: 1, disponible: true },
    { id: 3, nom: 'Garmin', prix: 30, category: 2, disponible: false },
    { id: 4, nom: 'DeRosa', prix: 40, category: 1, disponible: false },
    { id: 5, nom: 'VTT', prix: 50, category: 5, disponible: true },
]

function createProduct(nom, prix, category) {
    const newProduct = {
        id: products.length + 1,
        nom: nom,
        prix: prix,
        category: category,
        disponible: true
    };

    products.push(newProduct);
    
    return newProduct
}

module.exports = {products, createProduct}