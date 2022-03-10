const express = require(`express`);
const app = express();
const port = 8080;
const Container = require(`./container`);
const products = new Container(`products.txt`)

//Route: Products
app.get(`/products`, async (req, res) => {
    try {
        const result = await products.getAll();
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})

//Route: randomProducts
app.get(`/randomProduct`, async (req,res) => {
    try {
        const dataQuery = await products.getAll();
        const randomNumber = Math.floor(Math.random() * dataQuery.length);
        res.send(await products.getById(parseInt(randomNumber + 1)));
    } catch (error) {
        console.log(`Error: ${error}`);
    }
    
})

//Server port log
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);    
});

//Server error log
server.on(`error`, error => console.log(`Error on server ${error}`));