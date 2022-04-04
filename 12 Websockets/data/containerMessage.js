const fs = require(`fs`)

module.exports = class Container {
    constructor(fileName){
        this.fileName = fileName;
    }

    //Methods

    async saveMessage (newMessage) {
        try {
            const data = await fs.promises.readFile(`./${this.fileName}`, `utf-8`);
            const result = JSON.parse(data);
            const newData = [...result];
            const payload = {
                date: newMessage.date,
                author: newMessage.author,
                message: newMessage.message, 
            };
            newData.push(payload);
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(newData));
        } catch (error) {
            console.log(`Error: `, error);
            await fs.promises.writeFile(`./${this.fileName}`, `[]`)
            console.log(`File created, try again`);
        }
    };

    getAll() {
        try {
            const data = fs.readFileSync(`${this.fileName}`);
            const dataJSON = JSON.parse(data);
            return dataJSON;
        } catch (error) {
            return {error : error}
        }
    }
}
