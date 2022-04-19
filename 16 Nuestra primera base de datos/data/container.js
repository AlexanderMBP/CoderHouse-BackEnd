const fs = require(`fs`);
const {options} = require(`../DB/MariaDB`);
const knex = require(`knex`)(options);

module.exports = class ProductContainer {
    constructor(dataBase){
        this.dataBase = dataBase;
    }

    /* ----- Methods ----- */

    async save (object) {
        knex.from(this.dataBase).insert(object).then(() => console.log(`Data inserted`)).catch((err) => console.log(err))
    };

    async getById(id) {
        let dataQuery = knex.from(this.dataBase).where(`Id`, id)
        return dataQuery;
    };

    async getAll() {
        try {
            return await knex.select().from(this.dataBase);
        } catch (error) {
            console.log(error);
        }   
    };

    deleteById (id) {
        let dataQuery = knex.from(this.dataBase).where(`Id`, id).del().catch((err) => console.log(err)).finally(() => {knex.destroy()})
        return dataQuery;
    };

    async deteleAll () {
        let dataQuery = knex.from(this.dataBase).del().catch((err) => console.log(err)).finally(() => {knex.destroy()})
        return dataQuery;
    };

    async updateById(changes, id) {
        let dataQuery = knex.from(this.dataBase).where(`Id`, id).update({changes}).catch((err) => console.log(err)).finally(() => {knex.destroy()})
        return dataQuery;
    };
};
