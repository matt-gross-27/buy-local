const { Schema, model } = require('mongoose');

const purchaseSchema = new Schema({
  purchaseQuantity: {
    type: Number
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
});

const orderSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => timestamp.toLocaleString()
    },
    purchases: [purchaseSchema],
    shop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop'
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    toJSON: {
      getters: true
    }
  },
);

const Order = model('Order', orderSchema);

module.exports = Order;