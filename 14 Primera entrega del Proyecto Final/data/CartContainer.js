const fs = require(`fs`);

module.exports = class CartContainer {
    constructor(fileName){
        this.fileName = fileName;
    };

    /* ----- Methods ----- */

    async newCart () {
        try {
            const data = await fs.promises.readFile(`./${this.fileName}`, `utf-8`);
            const result = JSON.parse(data);
            const newData = [...result];
            const payload = {
                id: result.length + 1,
                timestamp: Date.now(),
                products: [],
            };
            newData.push(payload);
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(newData));
            return {status: `${payload.id} saved`};
        } catch (error) {
            console.log(`Error: `, error);
            await fs.promises.writeFile(`./${this.fileName}`, `[]`);
            console.log(`File created, try again`);
        };
    }

    deleteCartById (cartId) {
        try{
            const data = fs.readFileSync(`${this.fileName}`);
            const dataJSON = JSON.parse(data);
            const newData = dataJSON.filter((cart) => cart.id !== parseInt(cartId));
            fs.writeFileSync(`${this.fileName}`, JSON.stringify(newData));
            return {status: `ID: ${cartId} deleted correctly`};
        } catch (error) {
            console.log(`Error: `, error);
        };
    };

    async getProductsFromCart (cartId) {
        try {
            const data = await fs.promises.readFile(`./${this.fileName}`, `utf-8`);
            const dataJSON = JSON.parse(data);
            const cart = dataJSON.find((cart) => cart.id == parseInt(cartId));
            const cartProducts = cart.products
            return cartProducts
        } catch (error) {
            console.log(`Error: `, error);
        };
    };

    async addProducsToCart (cartId, productsToAdd) {
        try {
            const data = await fs.promises.readFile(`./${this.fileName}`, `utf-8`);
            const result = JSON.parse(data);
            let cartIndex = result.findIndex((cart) => {return cart.id == cartId});
            const cart = result[cartIndex];
            cart.products = [...cart.products, productsToAdd]
            result[cartIndex] = cart
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(result));
            return {status: `${productsToAdd} saved`};
        } catch (error) {
            console.log(`Error: `, error);
        };
    };

    async deleteProductWithIdFromCart (cartId, productId) {
        try{
            const data = fs.readFileSync(`${this.fileName}`);
            const dataJSON = JSON.parse(data);
            const cart = dataJSON.find((cart) => cart.id == parseInt(cartId));
            console.log(cart);
            cart.products = cart.products.filter((products) => products.id !== parseInt(productId));
            fs.writeFileSync(`${this.fileName}`, JSON.stringify([cart]));
            return {status: `ID: ${productId} deleted correctly`};
        } catch (error) {
            console.log(`Error: `, error);
        };
    }
}