const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    match: [/[A-Za-z]+/, 'non-alpha characters in name']
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    match: [/[A-Za-z]+/, 'non-alpha characters in name']
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'invalid email address']
  },

  password: {
    type: String,
    required: true,
    minLength: 8
  },

  isVendor: {
    type: Boolean,
    default: false
  },

  orderHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],

  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop'
  }
});

// hash user passwords before saving them to the database
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// function for validating passwords on login
userSchema.methods.validatePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
}

const User = model('User', userSchema);

module.exports = User;
