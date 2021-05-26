import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_ORDER } from '../utils/mutations';

function Success() {
    const [addOrder] = useMutation(CREATE_ORDER);

    useEffect(() => {
    async function saveOrder() {

        const products = cart.map(item => item._id);

        if (products.length) {
            const { data } = await addOrder({ variables: { products } });
            const productData = data.addOrder.products;
          
            productData.forEach((item) => {
            });
          }
    }

    setTimeout(() => {
      window.location.assign("/")
    }, 3000);

    saveOrder();


    }, [addOrder]);

    return (
      <div>
          <h1>Success!</h1>
          <h2>
            Thank you for your purchase!
          </h2>
          <h2>
            You will now be redirected to the homepage
          </h2>
      </div>
    );
  };

export default Success;