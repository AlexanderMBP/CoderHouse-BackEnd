const express = require(`express`);
const {Router} = express;

/* ----- Data query ----- */
const CartContainer = require(`../data/CartContainer.js`);
const carts = new CartContainer(`./data/carts.txt`);

/* ----- Router ----- */
const cartRouters = Router();

//Post new cart
cartRouters.post(`/`, async (req,res) => {
    try {
        const addCart = await carts.newCart();
        res.send(addCart)
    } catch (error) {
        console.log(`Error: ${error}`);
    };
});

//Delete cart with id
cartRouters.delete(`/:id`, async (req,res) => {
    try {
        let id = req.params.id;
        const deleteCartById = await carts.deleteCartById(id);
        res.send(deleteCartById)
    } catch (error) {
        console.log(`Error: ${error}`);
    };
});

//Get products from cart with id
cartRouters.get(`/:id/products`, async (req,res) => {
    try {
        let id = req.params.id;
        const getProductsFromCartWithId = await carts.getProductsFromCart(id);
        res.send(getProductsFromCartWithId)
    } catch (error) {
        console.log(`Error: ${error}`);
    };
})

//Post products into cart with id
cartRouters.post(`/:id/products`, async (req,res) => {
    try {
        let id = req.params.id;
        let bodyData = req.body;
        const addProducsToCart = await carts.addProducsToCart(id, bodyData)
        res.send(addProducsToCart)
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

//Delete products with id from cart
cartRouters.delete(`/:id/products/:id_products`, async (req,res) => {
    try {
        let cartId = req.params.id;
        let productId = req.params.id_products;
        const deleteProductWithIdFromCart = await carts.deleteProductWithIdFromCart(cartId, productId)
        res.send(deleteProductWithIdFromCart)
    } catch (error) {
        console.log(`Error: ${error}`);
    } 
});

/* ----- Export module ---- */
module.exports = cartRouters;