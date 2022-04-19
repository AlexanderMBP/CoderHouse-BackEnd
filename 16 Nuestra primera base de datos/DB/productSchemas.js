const {options} = require(`./MariaDB`);
const knex = require(`knex`)(options);

knex.schema.createTable('products', (table) => {
    table.increments('Id')
    table.timestamp('Product_timestamp').defaultTo(knex.fn.now())
    table.string('Title')
    table.string('Product_description')
    table.string('code')
    table.string('Thumbnail')
    table.float('Price')
    table.integer('Stock')
}).then(() => console.log(`Table created`))