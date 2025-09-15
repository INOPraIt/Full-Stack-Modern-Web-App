const mongoose = require('mongoose');

module.exports = mongoose.model("Category", new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  slug: {type: String, required: true, unique: true, index: true},
  description: {type: String, default: ''},
  image: {type: String, default: ''},
  parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null},
  isAcctive: {type: Boolean, default: true},
  order: {type: Number, default: 0},
},
  { timestamps: true }
))