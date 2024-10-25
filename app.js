const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb+srv://mohanprasadd:Asdzxc123@cluster0.wfuq1.mongodb.net/ecommerce1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Product schema and model
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    category: String
});

const Product = mongoose.model('Product', productSchema);

// Define Cart schema and model (ensure this is not duplicated)
const cartSchema = new mongoose.Schema({
    productId: String,
    productName: String,
    productPrice: Number,
});

const Cart = mongoose.model('Cart', cartSchema); // Only declare this once

// Middleware to parse JSON requests
app.use(express.json()); // Add this line to enable JSON parsing
app.use(express.static('public')); // Serve static files (CSS, JS)

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/mobile', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/mobile.html'));
});
app.get('/electronics', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/electronics.html'));
});
app.get('/clothing', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/clothing.html'));
});
app.get('/shoes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/shoes.html'));
});

// API route to fetch products by category
app.get('/products/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const products = await Product.find({ category: category });
        res.json(products);
    } catch (error) {
        res.status(500).send("Error fetching products");
    }
});

// Route to add a product to the cart
app.post('/add-to-cart', async (req, res) => {
    const { productId, productName, productPrice } = req.body;

    try {
        const newCartItem = new Cart({ productId, productName, productPrice });
        await newCartItem.save();
        res.status(201).json({ message: 'Product added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add product to cart' });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
