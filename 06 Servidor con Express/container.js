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
            return console.log(`Saved`);
        } catch (error) {
            console.log(`Error: `, error);
            await fs.promises.writeFile(`./${this.fileName}`, `[]`)
            console.log(`File created, try again`);
        }
    }

    async getById(id) {
        const data = fs.readFileSync(`${this.fileName}`);
        const dataJson = JSON.parse(data);
        return dataJson.find((item) => item.id === id)
    }

    async getAll() {
        try {
            const data = fs.readFileSync(`${this.fileName}`);
            const dataJSON = JSON.parse(data);
            return dataJSON;
        } catch (error) {
            console.log(error);
        }
    }

    deleteById (id) {
        const data = fs.readFileSync(`${this.fileName}`);
        const dataJSON = JSON.parse(data);
        const newData = dataJSON.filter((item) => item.id !== id);
        fs.writeFileSync(`${this.fileName}`, JSON.stringify(newData));
        console.log(`Deleted correctly`);
    }

    async deteleAll () {
        try {
            await fs.promises.unlink(`./${this.fileName}`);
            return console.log(`All content is deleted`)
        } catch (error) {
            console.log(`Error on delete: ${error}`);
        }
    }
}
