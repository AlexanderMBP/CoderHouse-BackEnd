const Container = require(`./containerMessage.js`);
const {options} = require(`../DB/SQLite3`);
const knex = require(`knex`)(options);

const messages = new Container(`messages`);
let getAll = messages.getAll();
function newMessage (message) {
    console.log(message);
    messages.saveMessage(message)
}

module.exports = {getAll, newMessage}