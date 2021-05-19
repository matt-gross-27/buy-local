const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema(
  {
    reviewText: {
      type: String,
      required: true,
      maxlength: 280
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    toJSON: {
      getters: true
    }
  })

  module.exports = reviewSchema;