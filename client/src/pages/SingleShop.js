import React from 'react';
import { useParams } from 'react-router-dom'; ///new react hook

import { useQuery } from '@apollo/react-hooks';
import { GET_SHOP_BY_ID } from '../utils/queries';

const GetSingleShop = props => {
    const { id: shopId } = useParams();
    // console.log(shopId); ///console.logs the id of the single shop (6090916bf7ee46cede452b7d) -> http://localhost:3000/thought/6090916bf7ee46cede452b7d
  
    const { loading, data } = useQuery(GET_SHOP_BY_ID, {
      variables: { _id: shopId }
    });
  
    const shop = data?.shop || [];

    console.log(shop)

    const products = shop.products

    console.log(products);

    const reviews = shop.reviews
  
    if (loading) {
      return <div>Loading single Shop</div>;
    }

  // let shopProducts = function () {
  //   for (let i = 0; i < products.length; i++) {
  //     const shopProducts = products[i]
  //     return shopProducts
  //   }
  // } 
  
 // return shopProducts

    return (
        <div>
          <div className="card mb-3">
            <p className="card-header">
              <span style={{ fontWeight: 700 }} className="text-light">
                {shop.name}
              </span>
            </p>
            <p>Store Instagram: {shop.instagram}</p>
            <div className="card-body">
              <p>Description: {shop.description}</p>
              <p>Location: {shop.city}, {shop.state}</p>
              <p>Phone Number: {shop.phone}</p>
              <p>Pickup Allowed? {shop.pickup}</p>
              <p>Delivery Allowed? {shop.delivery}</p>
              <p>Shipping Allowed? {shop.shipping}</p>
              <p>Rating Average: {shop.ratingAvg} stars</p>
            </div>
            <div className="card-body">
                <h2>Shop Reviews</h2>
                <p>Total Reviews: {shop.reviewCount}</p>
            </div>
            <div className="card-body">
                <h2>Products</h2>


                <div className="card-body">
               {products &&
                products.map(product => (
                    <div>
                      <p>{product.name}</p>
                      <p>{product.description}</p>
                      <p>Selling for ${product.price}</p>
                      <p>In Stock: {product.stock}</p>
                    </div>
                    
                ))}
              </div>

              <div className="card-body">
               {reviews &&
                reviews.map(review => (
                    <div>
                      <p>{review.reviewText}</p>
                      <p>{review.createdAt}</p>
                    </div>
                    
                ))}
              </div>

            </div>
          </div>
        </div>
      );
   
}

export default GetSingleShop;