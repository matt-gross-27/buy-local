const mongoose = require('mongoose');

const { Schema } = mongoose; ///added model here previously

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Category = mongoose.model('Category', categorySchema);
//const //Category = model('Category', categorySchema);

module.exports = Category;