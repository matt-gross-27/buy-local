import gql from 'graphql-tag';

export const GET_USER = gql`
    {
        user {
            _id
            firstName
            lastName
            email
            isVendor
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
    query getShopById($_id: ID!) {
        shop(_id: $_id) {
            _id
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
