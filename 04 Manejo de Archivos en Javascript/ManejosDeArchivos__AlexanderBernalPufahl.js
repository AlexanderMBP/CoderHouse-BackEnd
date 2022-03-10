const fs = require(`fs`)

class Container {
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
        const dataJSON = JSON.parse(data);
        let result = dataJSON.find((item) => item.id === id)
        return console.log(result);
    }

    async getAll() {
        try {
            const data = fs.readFileSync(`${this.fileName}`);
            const dataJSON = JSON.parse(data);
            return console.log(dataJSON);
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

//Items
let iPhone11 = {title: `iPhone 11`, price: `499`, thumbnail: `https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-select-2019-family?wid=882&hei=1058&fmt=jpeg&qlt=80&.v=1567022175704`}
let iPhone12 = {title: `iPhone 12`,price: `699`, thumbnail: `https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1617135051000`}
let iPhone13 = {title: `iPhone 13`, price: `799`, thumbnail: `https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1629842667000`}

//Testing

let productsFile = new Container ('products.txt');

// productsFile.save(iPhone13);
// productsFile.getById(1);
// productsFile.getAll()
// productsFile.deleteById(1)
// productsFile.deteleAll()

