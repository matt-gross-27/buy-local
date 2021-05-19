const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => timestamp.toLocaleString()
    },
    purchases: [
      {
        purchaseQuantity: {
          type: Number
        }
      },
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
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