const express = require(`express`);
const {Router} = express;
const Container = require(`../container`);
const products = new Container(`products.txt`)

const productsRouters = Router();
productsRouters.use(express.json())
productsRouters.use(express.urlencoded({extended: false}))

productsRouters.get(`/products`, async (req, res) => {
    try {
        const data = await products.getAll();
        res.send(data)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});

productsRouters.get(`/products/:id`, async (req,res) => {
    try {
        let id = req.params.id;
        let dataRetrieved = await products.getById(parseInt(id))
        res.send(dataRetrieved);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});

productsRouters.post(`/products`, (req,res) => {
    let bodyData = req.body;
    res.send(products.save(bodyData));
})

productsRouters.put(`/products/:id`, (req,res) => {
    let bodyData = req.body;
    let id = req.params.id;
    res.send(products.updateById(bodyData, id))
})

productsRouters.delete(`/products/:id`, (req,res) => {
    let id = req.params.id;
    res.send(products.deleteById(id))
})
module.exports = productsRouters