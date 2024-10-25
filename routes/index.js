const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get products by category
router.get('/products/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add new products (for testing purposes)
router.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
