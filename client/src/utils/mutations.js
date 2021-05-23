import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
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
    mutation createShop($name: String!, $description: String!, $phone: String!, $instagram: String!, $logo: String!, $addressNum: String!, $street: String!, $city: String!, $state: String!, $zip: String!, $stripeKey: String!, $pickup: Boolean, $delivery: Boolean, $shipping: Boolean) {
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