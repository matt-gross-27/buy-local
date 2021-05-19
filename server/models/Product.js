const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      maxlength: 280
    },
    image: {
      type: String
    },
    price: {
      type: Number,
      required: true,
      min: .01
    },
    stock: {
      type: Number,
      min: 0,
      default: 0
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  }
);

const Product = model('Product', productSchema);

module.exports = Product;