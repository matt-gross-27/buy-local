import gql from 'graphql-tag';

export const LOGIN = gql`
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
               _id
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
  updateShop($name: String!, $description: String!, $phone: String!, $instagram: String, $logo: String, $addressNum: String, $street: String, $city: String!, $state: String!, $zip: String, $stripeKey: String, $pickup: Boolean, $delivery: Boolean, $shipping: Boolean) {
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
      reviews {
        _id
        reviewText
        createdAt
      }
    }
  }
`;

export const CREATE_RATING = gql`
  mutation createRating(shopId: ID!, $stars: Int!) {
    createRating(shopId: $shopId, stars: $stars) {
      ratings {
        _id
        stars
        reviewText
      }
    }
  }
`;