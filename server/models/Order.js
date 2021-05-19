const { Schema, Model } = require('mongoose');

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
    shopId: {
      type: Schema.Types.ObjectId,
      ref: 'Shop'
    },
    customerId: {
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

const Order = Model('Order', orderSchema);

module.exports = Order;
