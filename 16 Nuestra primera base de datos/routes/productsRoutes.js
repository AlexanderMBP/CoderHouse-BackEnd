const express = require(`express`);
const {Router} = express;
const productsRouters = Router();

productsRouters.get(`/`, async (req,res) => {
    await res.render(`index`)
});

module.exports = productsRouters;