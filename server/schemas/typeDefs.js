const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    isVendor: Boolean
    # orderHistory: Order
    # shop: Shop

  }

  type Category {
    _id: ID
    name: String
  }

  type Rating {
    _id: ID
    userId: User
    stars: Int
    createdAt: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    stock: Int
    category: Category
  }

  type Review {
    _id: ID
    reviewText: String
    createdAt: String
    userId: User
  }

  type Shop {
    _id: ID
    name: String
    description: String
    instagram: String
    logo: String
    phone: String
    addressNum: String
    street: String
    city: String
    state: String
    zip: String
    stripeKey: String
    stripeKeyVerified: Boolean
    open: Boolean
    pickup: Boolean
    delivery: Boolean
    shipping: Boolean
    storeOwner: User
    categories: [Category]
    products: [Product]
    ratings: [Rating]
    reviews: [Review]
    ratingAvg: Float 
    categoryCount: Int
    reviewCount: Int
    ratingCount: Int
  }

  type Purchase {
    purchaseQuantity: Int
    product: Product
  }

  type Order {
    createdAt: Date
    purchases: [Purchase]
    shopId: Shop
    customerId: User
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;