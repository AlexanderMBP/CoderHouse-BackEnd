const Container = require(`./container.js`);

const products = new Container(`data/products.txt`);
let getAll = products.getAll();
function newProduct (product) {
    products.save(product)
}

module.exports = {getAll, newProduct}