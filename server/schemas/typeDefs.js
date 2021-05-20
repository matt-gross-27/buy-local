const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    isVendor: Boolean
    orderHistory: [Order]
    shop: Shop
  }

  type Category {
    _id: ID
    name: String
  }

  type Rating {
    _id: ID
    createdAt: String
    stars: Int
    user: User
  }

  type Review {
    _id: ID
    createdAt: String
    reviewText: String
    user: User
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
    owner: User
    categories: [Category]
    products: [Product]
    sales: [Order]
    ratings: [Rating]
    reviews: [Review]
    categoryCount: Int
    reviewCount: Int
    ratingCount: Int
    ratingAvg: Float 
  }

  type Purchase {
    purchaseQuantity: Int
    product: Product
  }

  type Order {
    createdAt: String
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
    getShops: [Shop]
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    order(_id: ID!): Order
    category(name: String!): Category
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    createShop(name: String!, description: String!, phone: String!, instagram: String, logo: String, addressNum: String, street: String, city: String!, state: String!, zip: String, stripeKey: String, pickup: Boolean, delivery: Boolean, shipping: Boolean): Shop
    updateProduct(_id: ID!, stock: Int!): Product
    createCategory(name: String!): Category 
    deleteCategory(name: String!): Category
  }
`;

module.exports = typeDefs;