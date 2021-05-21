const { AuthenticationError } = require('apollo-server-express');
const { User, Shop, Order, Category, Product } = require('../models');
const { findOneAndUpdate } = require('../models/Order');
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
        const user = await User.findById(context.user._id)

        return user
      }
      throw new AuthenticationError('Not logged in');
    },

    shops: async () => {
      const shops = await Shop.find()
        .populate({ path: 'categories' })
        .populate({ path: 'products', populate: { path: 'category' } });
      return shops;
    },

    shop: async (parent, { _id }) => {
      const shop = await Shop.findById(_id)
        .populate({ path: 'owner' })
        .populate({ path: 'categories' })
        .populate({ path: 'products', populate: { path: 'category' } })

      return shop;
    },

    myOrderHistory: async (parent, args, context) => {
      const orderHistory = await Order.find({ customer: context.user._id })
        .populate({
          path: 'orderHistory',
          populate: { path: 'purchases.product' }
        });

      return orderHistory;
    },

    mySales: async (parent, args, context) => {
      const sales = await Shop.find({ owner: context.user._id })
        .populate({ path: 'sales', populate: { path: 'purchases.product' } });
    }
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

    createShop: async (parent, args, context) => {
      if (context.user) {
        let shop = await Shop.create({
          owner: context.user._id,
          ...args
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $set: { isVendor: true, shop: shop._id } },
          { new: true, runValidators: true }
        ).populate({ path: 'shop' });

        return shop;
      }
      throw new AuthenticationError('Not Logged In');
    },

    createCategory: async (parent, args, context) => {
      if (context.user) {
  
        const newCategory = await Category.create({
          name: args.name
        });
        
        await Product.findByIdAndUpdate(
          { _id: context._id },
          { $push: { category: newCategory} },
          { new: true, runValidators: true }
        ).populate({ path: 'category' });
  
        return newCategory;
      }
      throw new AuthenticationError('Not Logged In');
    },

    deleteCategory: async (parent, args, context) => {
      if (context.user) {

        const deleteCategory = await Category.findByIdAndDelete(
          { _id: args._id }
        );

        await Product.findByIdAndUpdate(
          { _id: context._id },
          { $pull: { category: deleteCategory} },
          { new: true, runValidators: true }
        ).populate( {path: 'category'});

        return deleteCategory;
      }
      throw new AuthenticationError('Not Logged In');
    },
  
    updateShop: async (parent, args, context) => {
      if (context.user) {
        const shop = await Shop.findOneAndUpdate(
          { owner: context.user._id },
          { $set: { ...args } },
          { new: true, runValidators: true }
        ).populate([
          { path: 'owner' },
          { path: 'categories' },
          { path: 'products' },
          { path: 'sales', populate: { path: 'purchases.product' } }
        ]);

        return shop;
      }
      throw new AuthenticationError('Not Logged In');
    },

    createReview: async (parent, { shopId, reviewText }, context) => {
      if (context.user) {
        const shop = await Shop.findOneAndUpdate(
          { _id: shopId },
          { $push: { reviews: { reviewText, user: context.user._id } } },
          { new: true, runValidators: true }
        )
        .populate({ path: 'reviews', populate: { path: 'user', select: "firstName lastName" } })
        .populate({ path: 'ratings', populate: { path: 'user', select: "firstName lastName" } });


        return shop;
      }
      throw new AuthenticationError('Not logged in');
    },

    createRating: async (parent, { shopId, stars }, context) => {
      if (context.user) {
        const shop = await Shop.findOneAndUpdate(
          { _id: shopId },
          { $push: { ratings: { stars, user: context.user._id } } },
          { new: true, runValidators: true }
        )
        .populate({ path: 'reviews', populate: { path: 'user', select: "firstName lastName" } })
        .populate({ path: 'ratings', populate: { path: 'user', select: "firstName lastName" } });

        return shop;
      }
      throw new AuthenticationError('Not logged in');
    },

    createCategory: async (parent, { name }, context) => {
      if (context.user) {

        let category = await Category.findOne({ name });

        if (!category) {
          category = await Category.create({ name });
        }

        const shop = await Shop.findOneAndUpdate(
          { owner: context.user._id },
          { $addToSet: { categories: category._id } },
          { new: true, runValidators: true }
        ).populate({ path: 'categories' })

        return shop;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    createProduct: async (parent, args, context) => {
      if (context.user) {

        let category = await Category.findOne({ name: args.categoryName });

        if (!category) {
          category = await Category.create({ name: args.categoryName });

          await Shop.findOneAndUpdate(
            { owner: context.user._id },
            { $addToSet: { categories: category._id } },
            { new: true, runValidators: true }
          ).populate({ path: 'categories' })
        }

        const product = await Product.create({
          name: args.name,
          description: args.description,
          image: args.image,
          price: args.price,
          stock: args.stock,
          category: category._id
        });

        const shop = await Shop.findOneAndUpdate(
          { owner: context.user._id },
          { $push: { products: product._id } },
          { new: true, runValidators: true }
        ).populate({ path: 'products', populate: { path: 'category' } })

        return shop;
      }
      throw new AuthenticationError('Not logged in');
    },

    updateProduct: async (parent, args, context) => {
      if (context.user) {
        let category = await Category.findOne({ name: args.categoryName });

        if (!category) {
          category = await Category.create({ name: args.categoryName });
        }

        const product = await Product.findOneAndUpdate(
          { _id: args._id },
          {
            $set: {
              name: args.name,
              description: args.description,
              image: args.image,
              price: args.price,
              stock: args.stock,
              category: category._id
            }
          },
          { new: true, runValidators: true }
        ).populate({ path: 'category' });

        const shop = await Shop.findOneAndUpdate(
          { owner: context.user._id },
          { $addToSet: { categories: { _id: category._id } } },
          { new: true, runValidators: true })
          .populate([{ path: 'categories' }, { path: 'products', populate: { path: 'category' } }]);

        return shop;
      }

      throw new AuthenticationError('Not logged in');
    },
    createOrder: async (parent, { orderInput }, context) => {
      if (context.user) {
        const order = await Order.create(orderInput);

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { orderHistory: order._id } },
          { new: true, runValidators: true }
        );

        await Shop.findOneAndUpdate(
          { _id: orderInput.shop },
          { $push: { sales: order._id } },
          { new: true, runValidators: true }
        ); 

        await orderInput.purchases.forEach(({ purchaseQuantity, product }) => {
          Product.findOneAndUpdate(
            { _id: product._id },
            { $inc: { stock: purchaseQuantity * -1 } },
            { new: true, runValidators: true },
          );
        });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
  }
}

module.exports = resolvers;
