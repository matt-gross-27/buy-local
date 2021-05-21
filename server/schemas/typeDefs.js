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

  input purchaseInput {
    purchaseQuantity: Int
    product: ID
  }

  input orderInput {
    purchases: [purchaseInput]
    shop: ID
    createdAt: String
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
    shop(_id: ID): Shop
    shops: [Shop]
    categories: [Category]
    product(_id: ID!): Product
    products(category: ID, name: String): [Product]
    myOrderHistory: [Order]
    mySales: [Order]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    
    createShop(name: String!, description: String!, phone: String!, instagram: String, logo: String, addressNum: String, street: String, city: String!, state: String!, zip: String, stripeKey: String, pickup: Boolean, delivery: Boolean, shipping: Boolean): Shop
    updateShop(name: String, description: String, phone: String, instagram: String, logo: String, addressNum: String, street: String, city: String, state: String, zip: String, stripeKey: String, pickup: Boolean, delivery: Boolean, shipping: Boolean): Shop

    createCategory(name: String!): Shop
    createProduct(name: String!, description: String, image: String, price: Float!, stock: Int!, categoryName: String): Shop
    updateProduct(name: String!, description: String!, image: String!, price: Float!, stock: Int!, categoryName: String!, _id: ID!): Shop
    
    createRating(shopId: ID!, stars: Int!): Shop
    createReview(shopId: ID!, reviewText: String!): Shop    
    
    createOrder(orderInput: orderInput): Order
  }
`;

module.exports = typeDefs;