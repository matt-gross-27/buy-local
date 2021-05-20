const { AuthenticationError } = require('apollo-server-express');
const { User, Shop, Order, Category, Product } = require('../models');
const { signToken } = require('../utils/auth');
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};
      if (category) {
        params.category = category;
      }
      if (name) {
        params.name = {
          $regex: name
        };
      }
      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({ path: 'shop' });
        return user
      }
      throw new AuthenticationError('Not logged in');
    },

    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },

    getShops: async () => {
      const shops = await Shop.find()
        .populate({ path: 'owner' })
        .populate({ path: 'categories' })
        .populate({ path: 'products' })
        .populate({ path: 'sales' });

      return shops;
    }

  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    createOrder: async (parent, { products }, context) => {
      if (context.user) {
        const orderHistory = new Order({ products });
        // const sales = 

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: orderHistory } });
       //  await Shop.findByIdAndUpdate(context.user._id, { $push: { orders: sales } })
        return orderHistory;
      }

      throw new AuthenticationError('Not logged in');
    },

    updateProduct: async (parent, { _id, stock }) => {
      const decrement = Math.abs(stock) * -1;
      return await Product.findByIdAndUpdate(
        _id, 
        { $inc: { stock: decrement } }, 
        { new: true });
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

    createShop: async (parent, args, context) => {
      if (context.user) {

        const shop = await Shop.create({
          owner: context.user._id,
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
        
        await shop
          .populate({ path: 'owner' })
          .populate({ path: 'categories' })
          .populate({ path: 'products' })
          .populate({ path: 'sales' });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $set: { isVendor: true, shop: shop._id } },
          { new: true, runValidators: true }
        ).populate({ path: 'shop' });

        return shop;
      }
      throw new AuthenticationError('Not Logged In');
    },

    createReview: async (parent, { shopId, reviewText }, context) => {
      if (context.user) {
        const updatedReview = await Shop.findOneAndUpdate(
          { _id: shopId },
          // need to check
          { $push: { reviews: { reviewText, shop: context.user.shop } } },
          { new: true, runValidators: true }
        );

        return updatedReview;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    createRating: async (parent, { shopId, stars }, context) => {
      if (context.user) {
        const updatedRating = await Shop.findOneAndUpdate(
          { _id: shopId },
          // need to check
          { $push: { reviews: { stars, shop: context.user.shop } } },
          { new: true, runValidators: true }
        );

        return updatedRating;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  }
}

module.exports = resolvers;
