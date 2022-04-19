const express = require('express');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const handlebars = require("express-handlebars");
const productsRouters = require('./routes/productsRoutes.js');
const products = require('./data/products.js');
const messages = require('./data/messages.js');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", productsRouters);
app.use(express.static(__dirname+ '/public'));

let queryProducts = products.getAll
let queryMessages = messages.getAll;

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    layoutDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs');
app.set('views', './views');


io.on('connection', function(socket) {
    console.log('User connected');

    queryProducts.then(data => {io.sockets.emit('products', {products : data})})
    queryMessages.then(messages => {io.sockets.emit('messages', messages)})

    socket.on("product", (item) => {
        products.newProduct(item); 
    });
    socket.on("newMessage", (message) => {
        messages.newMessage(message);
    })
});

const PORT = 8080;

httpServer.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Server listening on port: ${PORT}`);
	}
})