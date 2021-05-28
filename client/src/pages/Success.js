import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {

  const [createOrder] = useMutation(CREATE_ORDER);

  useEffect(() => {
  async function saveOrder() {

      const cart = await idbPromise('cart', 'get');
      const products = cart.map(item => item._id);

      if (products.length) {
          const { data } = await createOrder({ variables: { products } });
          const productData = data.createOrder.products;
        
          productData.forEach((item) => {
            idbPromise('cart', 'delete', item);
          });
        }
  }

  setTimeout(() => {
    window.location.assign("/")
  }, 3000);

  saveOrder();


  }, [createOrder]);

    return (
<div className="success">
    <div className="success-card">
        <div className= "checkmarkDiv">
        <i className="checkmark">✓</i>
      </div>
        <h1>Success</h1> 
        <p>We received your purchase request.<br/> We'll be in touch shortly!</p>
      </div>
</div>
    );
  };

export default Success;