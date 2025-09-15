const mongoose = require('mongoose');

module.exports = mongoose.model("Products", new mongoose.Schema({
  named: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  sale: { type: Number, default: 0 },
  profit: { type: Number, required: true },
  previewImages:{ type:[String], default:[]},
  status: { type: Boolean, default: true },
  numberOfCopies: { type: Number, default: 100 },
  categories: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true}
  ]
}));
