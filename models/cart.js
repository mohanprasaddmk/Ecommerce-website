const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }, // Link to the product
    quantity: { type: Number, default: 1 }, // Quantity of the product in the cart
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
