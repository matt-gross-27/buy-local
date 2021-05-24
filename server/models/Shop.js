const { Schema, model } = require('mongoose');
const ratingSchema = require('./Rating');
const reviewSchema = require('./Review');

const shopSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    
    shopType: {
      type: String,
      enum: ['Food', 'Sweets', 'Clothing', 'Other']
    },

    description: {
      type: String,
      maxlength: 280,
      required: true
    },

    instagram: {
      type: String,
      match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'invalid url']
    },

    hero: {
      type: String,
      default: "shopping-bags-500x500_vpqouy" 
    },

    logo: {
      type: String,
      default: "Screen_Shot_2021-05-18_at_7.22.02_PM_gu1bfi"
    },

    phone: {
      type: String,
      minLength: 10,
      required: true,
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
      required: true
    },

    state: {
      type: String,
      required: true
    },

    zip: {
      type: String,
      minLength: 5,
      maxLength: 5,
      match: [/[0-9]+/, 'must be 5 digits']
    },

    stripeKey: {
      type: String,
      default: 'pk_test_TYooMQauvdEDq54NiTphI7jx'
    },

    stripeKeyVerified: {
      type: Boolean,
      default: false
    },

    open: {
      type: Boolean,
      default: false
    },

    pickup: {
      type: Boolean,
      default: false
    },

    delivery: {
      type: Boolean,
      default: false
    },

    shipping: {
      type: Boolean,
      default: false
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true
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
    
    sales: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order'
      }
    ],

    ratings: [ratingSchema],
    reviews: [reviewSchema]
  },
  {
    toJSON: {
      virtuals: true,
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
  try { 
    return Math.round(this.ratings.map(rating => rating.stars)
      .reduce((a, b) => a + b) / this.ratings.length * 100) / 100 
  } catch (e) { 
    return 0
  } 
});

const Shop = model('Shop', shopSchema);

module.exports = Shop;