const { Schema, model } = require('mongoose');
const ratingSchema = require('./Rating');
const reviewSchema = require('./Review');

const shopSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 60,
      unique: true
    },

    description: {
      type: String,
      maxlength: 280
    },

    instagram: {
      type: String,
      match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'invalid url']
    },

    logo: {
      type: String,
      match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'invalid url']
    },

    phone: {
      type: String,
      minLength: 10,
      maxLength: 10,
      match: [/[0-9]+/, 'must be 10 digits']

    },
    
    addressNum: {
      type: String,
      match: [/[0-9]+/, 'numbers only']
    },

    street: {
      type: String,
    },

    city: {
      type: String,
    },

    state: {
      type: String
    },

    zip: {
      type: String,
      minLength: 5,
      maxLength: 5,
      match: [/[0-9]+/, 'must be 5 digits']
    },

    stripeKey: {
      type: String,
    },

    stripeKeyVerified: {
      type: Boolean,
      default: false
    },

    open: {
      type: Boolean,
      default: true
    },

    pickup: {
      type: Boolean,
      default: true
    },

    delivery: {
      type: Boolean,
      default: false
    },

    shipping: {
      type: Boolean,
      default: false
    },

    storeOwner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category'
      }
    ],

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    ratings: [ratingSchema],
    reviews: [reviewSchema]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

shopSchema.virtual('categoryCount').get(function() {
  return this.categories.length
});

shopSchema.virtual('reviewCount').get(function() {
  return this.reviews.length
});

shopSchema.virtual('ratingCount').get(function() {
  return this.ratings.length
});

shopSchema.virtual('ratingAvg').get(function() {
  return Math.round(this.ratings.reduce((a, b) => a + b) / this.ratings.length * 100) / 100
});

const Shop = model('Shop', shopSchema);

module.exports = Shop;