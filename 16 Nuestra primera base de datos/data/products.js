const Container = require(`./container.js`);

const products = new Container(`products`);

let getAll = products.getAll()
function newProduct (product) {
    products.save(product)
}

module.exports = {getAll, newProduct}