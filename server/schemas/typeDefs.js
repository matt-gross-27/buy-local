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
    shopType: String
    hero: String
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

  input purchaseInput {
    purchaseQuantity: Int
    product: ID
  }

  input orderInput {
    purchases: [purchaseInput]
    shop: ID
  }

  type Order {
    _id: ID!
    createdAt: String
    purchases: [Purchase]
    shop: Shop
    customer: User
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    user: User
    shop(_id: ID): Shop
    shops: [Shop]
    product(_id: ID!): Product
    categories: [Category]
    products(category: ID, name: String): [Product]
    myOrderHistory: [Order]
    mySales: [Order]
    allOrders: [Order]
    order(_id: ID!): Order
    checkout(orderInput: orderInput): Checkout
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createShop(name: String!, shopType: String, hero: String, description: String!, phone: String!, instagram: String, logo: String, addressNum: String, street: String, city: String!, state: String!, zip: String, stripeKey: String, pickup: Boolean, delivery: Boolean, shipping: Boolean): Shop
    updateShop(name: String, shopType: String, hero: String, description: String, phone: String, instagram: String, logo: String, addressNum: String, street: String, city: String, state: String, zip: String, stripeKey: String, pickup: Boolean, delivery: Boolean, shipping: Boolean): Shop
    createCategory(name: String!): Shop
    deleteCategory(name: String!): Category
    createProduct(name: String!, description: String, image: String, price: Float!, stock: Int!, categoryName: String): Shop
    updateProduct(name: String!, description: String!, image: String, price: Float!, stock: Int!, categoryName: String!, _id: ID!): Shop
    createRating(shopId: ID!, stars: Int!): Shop
    createReview(shopId: ID!, reviewText: String!): Shop    
    
    #NOT WORKING YET
    createOrder(orderInput: orderInput): Order
  }
`;
// /////createdAt: String removed from createRating/createReview until we can figure out how to fix the user: null issue
//exporting typeDefs here
module.exports = typeDefs;