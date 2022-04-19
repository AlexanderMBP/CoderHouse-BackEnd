const {options} = require(`./SQLite3`);
const knex = require(`knex`)(options);

knex.schema.createTable('messages', (table) => {
    table.increments('id')
    table.timestamp('date').defaultTo(knex.fn.now())
    table.string('author')
    table.integer('message')
}).then(() => console.log(`Table created`))