const fs = require(`fs`)
const {options} = require(`../DB/SQLite3`);
const knex = require(`knex`)(options);

module.exports = class Container {
    constructor(dataBase){
        this.dataBase = dataBase;
    }

    //Methods

    async saveMessage (newMessage) {
        knex.from(this.dataBase).insert(newMessage).then(() => console.log(`Data inserted ${newMessage}`)).catch((err) => console.log(err))
    };

    async getAll() {
        try {
            return await knex.select().from(this.dataBase);
        } catch (error) {
            console.log(error);
        }  
    }
}
