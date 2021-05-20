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
        getShops {
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