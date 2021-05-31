import gql from 'graphql-tag';

///may need to edit this//
export const GET_USER = gql`
    {
        user {
            _id
            firstName
            lastName
            email
            isVendor
            orderHistory {
                _id
                purchases {
                    purchaseQuantity
                    product {
                        name
                    }
                }
            }
            shop {
                _id
                name
                description
                sales {
                    purchases {
                        purchaseQuantity
                        product {
                            name
                        }
                    }
            
                }
            }
        }
    }
`;

export const GET_SHOPS = gql`
    {
        shops {
            _id
            name
            hero
            shopType
            description
            instagram
            logo
            phone
            addressNum
            street
            city
            state
            zip
            stripeKey
            stripeKeyVerified
            open
            pickup
            delivery
            shipping
            owner {
                _id
                firstName
                lastName
                email
            }
            categories {
                name
            }
            products {
                _id
                name
                description
                price
                image
                stock
            }
            sales {
                purchases {
                    purchaseQuantity
                    product {
                        _id
                        name
                    }
                }
            }
            ratings {
                createdAt
                stars
                user {
                    firstName
                }
            }
            reviews {
                createdAt
                reviewText
                user {
                    firstName
                }
            }
            categoryCount
            reviewCount
            ratingCount
            ratingAvg
        }
    }
`;

export const GET_SHOP_BY_ID = gql`
    query getShopById($_id: ID) {
        shop(_id: $_id) {
            _id
            hero
            shopType
            name
            description
            instagram
            logo
            phone
            addressNum
            street
            city
            state
            zip
            stripeKey
            stripeKeyVerified
            open
            pickup
            delivery
            shipping
            owner {
                _id
                firstName
                lastName
                email
            }
            categories {
                _id
                name
            }
            products {
                _id
                name
                description
                price
                image
                stock
                category {
                    _id
                    name
                }
            }
            sales {
                _id
                purchases {
                    purchaseQuantity
                    product {
                        _id
                        name
                    }
                }
            }
            ratings {
                createdAt
                stars
                user {
                    firstName
                }
            }
            reviews {
                createdAt
                reviewText
                user {
                    _id
                    firstName
                }
            }
            categoryCount
            reviewCount
            ratingCount
            ratingAvg
        }
    }
`;

export const GET_CATEGORIES = gql`
    {
        categories {
            name
        }
    }
`;


export const GET_PRODUCTS = gql`
    {
        products {
            _id
            name
            description
            price
            image
            stock
        }
    }
`;

export const ALL_ORDERS = gql`
    {
        allOrders {
            _id
            purchases {
                purchaseQuantity
                product {
                    _id
                    name
                    price
                }
            }
            shop {
                _id
                name
            }
            customer {
                _id
                firstName
                lastName
            }
        }
    }
`;

export const MY_ORDER_HISTORY = gql`
    {
        myOrderHistory {
            _id
            purchases {
                purchaseQuantity
                product {
                    _id
                    name
                    price
                }
            }
            shop {
                _id
                name
            }
            customer {
                _id
            }
        }
    }
`;

export const MY_SALES = gql`
    {
        mySales {
            _id
            createdAt
            purchases {
                purchaseQuantity
                product {
                    _id
                    name
                    price
                }
            }
            customer {
                _id
                firstName
                lastName
            }
        }
    }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($orderInput: orderInput!) {
    checkout(orderInput:$orderInput) {
      session
    }
  }
`;