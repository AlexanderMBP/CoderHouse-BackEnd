const express = require(`express`);
const {Router} = express;
const Container = require(`../container`);
const products = new Container(`products.txt`);
const productsRouters = Router();

productsRouters.get(`/`, async (req,res) => {
    await res.render(`index.pug`)
});
productsRouters.post(`/products`, async (req,res) => {
    let bodyData = await req.body;
    products.save(bodyData)
    res.redirect(`/`)
});
productsRouters.get(`/products`, async (req,res) => {
    const queryProducts = await products.getAll()
    await res.render(`products.pug`, {products : queryProducts})
});



module.exports = productsRouters;