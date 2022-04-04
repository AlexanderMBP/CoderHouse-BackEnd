const Container = require(`./containerMessage.js`);

const messages = new Container(`data/messages.txt`);
let getAll = messages.getAll();
function newMessage (message) {
    console.log(message);
    messages.saveMessage(message)
}

module.exports = {getAll, newMessage}