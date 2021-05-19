const { AuthenticationError } = require('apollo-server-express');
const { User, Shop, Order, Category, Product } = require('../models');
const { signToken } = require('../utils/auth');
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user
      }
      throw new AuthenticationError('Not logged in');
    },

    // addMoreQueries {},
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect login credentials');
      }
      const validPassword = await user.validatePassword(password);
      if (!validPassword) {
        throw new AuthenticationError('Incorrect login credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    createShop: async(parent, args, context) => {
      if (context.user) {

        const shop = await Shop.create({
          storeOwner: context.user._id,
          name: args.name,
          description: args.description,
          phone: args.phone,
          instagram: args.instagram,
          logo: args.logo,
          addressNum: args.addressNum,
          street: args.street,
          city: args.city,
          state: args.state,
          zip: args.zip,
          stripeKey: args.stripeKey,
          pickup: args.pickup,
          delivery: args.delivery,
          shipping: args.shipping,
        });

        shop.populate('storeOwner');
        
        User.findByIdAndUpdate(
          { _id: context.user._id },
          { "isVendor": true, "shop": shop._id },
          { new: true, runValidators: true }
        );

        return shop;
      }
      throw new AuthenticationError('Not Logged In');
    }
  },
}

module.exports = resolvers;
