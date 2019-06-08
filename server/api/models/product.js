const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    preview: { type: String, required: true },
    category: { type: String, ref: 'Category', required: true }
});

module.exports = mongoose.model('Product', productSchema);