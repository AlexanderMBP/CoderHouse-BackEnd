const fs = require(`fs`)

module.exports = class Container {
    constructor(fileName){
        this.fileName = fileName;
    }

    //Methods

    async save (object) {
        try {
            const data = await fs.promises.readFile(`./${this.fileName}`, `utf-8`);
            const result = JSON.parse(data);
            const newData = [...result];
            const payload = {
                title: object.title,
                price: object.price,
                thumbnail: object.thumbnail,
                id: result.length + 1
            };
            newData.push(payload);
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(newData));
            return {status: `${payload} saved`};
        } catch (error) {
            console.log(`Error: `, error);
            await fs.promises.writeFile(`./${this.fileName}`, `[]`)
            console.log(`File created, try again`);
        }
    }

    async getById(id) {
        const data = fs.readFileSync(`${this.fileName}`);
        const dataJson = JSON.parse(data);
        const findProduct = await dataJson.find((item) => item.id === id);
        if (findProduct == undefined) {
            return {error : `product not found`}
        } else {
            console.log(findProduct);
            return findProduct
        }
    }

    async getAll() {
        try {
            const data = fs.readFileSync(`${this.fileName}`);
            const dataJSON = JSON.parse(data);
            return dataJSON;
        } catch (error) {
            return {error : error}
        }
    }

    deleteById (id) {
        const data = fs.readFileSync(`${this.fileName}`);
        const dataJSON = JSON.parse(data);
        const newData = dataJSON.filter((item) => item.id !== parseInt(id));
        fs.writeFileSync(`${this.fileName}`, JSON.stringify(newData));
        return {status: `ID: ${id} deleted correctly`}
    }

    async deteleAll () {
        try {
            await fs.promises.unlink(`./${this.fileName}`);
            return {status: `All content is deleted`}
        } catch (error) {
            return {error : error}
        }
    }

    async updateById(changes, id) {
        try {
            const data = fs.readFileSync(`${this.fileName}`);
            const dataJSON = JSON.parse(data);
            let productIndex = dataJSON.findIndex((product) => {return product.id == id});
            dataJSON[productIndex] = {...changes, id: parseInt(id)};
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(dataJSON))
            return {status: `PRODUCT ID: ${id} updated`}
        } catch (error) {
            return {error : error}
        }
    }
}
