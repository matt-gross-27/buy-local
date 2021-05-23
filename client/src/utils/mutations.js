import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const CREATE_USER = gql`
    mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            token
            user {
                firstName
                lastName
                email
                isVendor
            }
        }
    }
`;

export const CREATE_SHOP = gql`
    mutation createShop($name: String!, $description: String!, $phone: String!, $instagram: String, $logo: String, $addressNum: String, $street: String, $city: String!, $state: String!, $zip: String, $stripeKey: String, $pickup: Boolean, $delivery: Boolean, $shipping: Boolean) {
        createShop(name: $name, description: $description, phone: $phone, instagram: $instagram, logo: $logo, addressNum: $addressNum, street: $street, city: $city, state: $state, zip: $zip, stripeKey: $stripeKey, pickup: $pickup, delivery: $delivery, shipping: $shipping) {
            owner {
              _id
              firstName
              lastName
            }
            name
            description
            phone
            instagram
            logo
            addressNum
            street
            city
            state
            zip
            stripeKey
            pickup
            delivery
            shipping
        }
    }
`;

export const UPDATE_SHOP = gql`
  mutation updateShop($name: String!, $description: String!, $phone: String!, $instagram: String, $logo: String, $addressNum: String, $street: String, $city: String!, $state: String!, $zip: String, $stripeKey: String, $pickup: Boolean, $delivery: Boolean, $shipping: Boolean) {
    updateShop(name: $name, description: $description, phone: $phone, instagram: $instagram, logo: $logo, addressNum: $addressNum, street: $street, city: $city, state: $state, zip: $zip, stripeKey: $stripeKey, pickup: $pickup, delivery: $delivery, shipping: $shipping) {
      owner {
              _id
              firstName
              lastName
            }
            name
            description
            phone
            instagram
            logo
            addressNum
            street
            city
            state
            zip
            stripeKey
            pickup
            delivery
            shipping
      }
   }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory($name: String!) {
    createCategory(name: $name) {
      categories {
        _id
        name
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($name: String!, $description: String, $image: String, $price: Float!, $stock: Int!, $categoryName: String) {
    createProduct(name: $name, description: $description, image: $image, price: $price, stock: $stock, categoryName: $categoryName) {
      products {
        name
        description
        image
        price
        stock
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($shopId: ID!, $reviewText: String!) {
    createReview(shopId: $shopId, reviewText: $reviewText) {
      _id
      reviews {
        _id
        reviewText
        createdAt
        user {
          _id
          firstName
          lastName
          email
        }
      }
    }
  }
`;

export const CREATE_RATING = gql`
  mutation createRating($shopId: ID!, $stars: Int!) {
    createRating(shopId: $shopId, stars: $stars) {
      _id
      ratings {
        _id
        stars
        createdAt
        user {
          _id
          firstName
          lastName
          email
        }
      }
      ratingCount
      ratingAvg
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($_id: ID!, $name: String!, $description: String!, $image: String!, $price: Float!, $stock: Int!, $categoryName: String!) {
    updateProduct(_id: $id, name: $name, description: $description, image: $image, price: $price, stock: $stock, categoryName: $categoryName) {
      products {
        _id
        name
        description
        image
        price
        stock
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation createOrder($orderInput: orderInput) {
    createOrder(orderInput: $orderInput) {
      shop {
        _id
      }
      customer {
        _id
      }
      purchases {
        purchaseQuantity
        product {
          _id
          image
          name
          price
        }
      }
    }
  }
`;


