const { Schema } = require('mongoose');

const ratingSchema = new Schema(
  {
    stars: {
      type: Number,
      min: 0,
      max: 5
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => timestamp.toLocaleString()
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

  module.exports = ratingSchema;