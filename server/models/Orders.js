const mongoose = require('mongoose');

module.exports = mongoose.model("Orders", new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  number: { type: Number, required: true },
  description: {type: String, required: true},
  sum: { type: Number, defaul: 0 },
}));
