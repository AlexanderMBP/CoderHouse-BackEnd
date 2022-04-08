const express = require(`express`);
const {Router} = express;
const authMiddleware = require(`./authMiddleware.js`)

/* ----- Data query ----- */
const ProductContainer = require(`../data/ProductsContainer.js`);
const products = new ProductContainer(`./data/products.txt`);

/* ----- Router ----- */
const productsRouters = Router();

//Get all products
productsRouters.get(`/`, async (req,res) => {
    try {
        const data = await products.getAll();
        res.send(data);
    } catch (error) {
        console.log(`Error: ${error}`)
    };
});

//Get with id
productsRouters.get(`/:id`, async (req,res) => {
    try {
        let id = req.params.id;
        let dataQuery = await products.getById(id)
        res.send(dataQuery);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});

//Post new product
productsRouters.post(`/`,authMiddleware , (req,res) => {
    console.log(bodyData);
    res.send(products.save(bodyData));        
    
});

//Update product with id
productsRouters.put(`/:id`,authMiddleware , (req,res) => {
    let bodyData = req.body;
    let id = req.params.id;
    res.send(products.updateById(bodyData, id))
});

//Delete product with id
productsRouters.delete(`/:id`,authMiddleware , (req,res) => {
    let id = req.params.id;
    res.send(products.deleteById(id))
});

/* ----- Export module ---- */
module.exports = productsRouters;