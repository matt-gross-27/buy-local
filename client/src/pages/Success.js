import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { useParams } from 'react-router-dom';

function Success() {

  const [createOrder] = useMutation(CREATE_ORDER);
  const { shop } = useParams()

  useEffect(() => {
    async function saveOrder() {

      const cart = await idbPromise('cart', 'get');
      const orderInput = {
        shop,
        purchases: []
      }

      cart.forEach(item => {
        orderInput.purchases.push({
          purchaseQuantity: item.purchaseQuantity,
          product: item._id,
        });
      });

      if (orderInput.purchases.length) {
        const { data } = await createOrder({ variables: { orderInput } });

        data.createOrder.purchases.forEach(({ product }) => {
          idbPromise('cart', 'delete', product);
        });

        console.log(data);
      }
    }

    setTimeout(() => {
      window.location.assign("/")
    }, 3000);

    saveOrder();
  }, [createOrder, shop]);

  return (
    <div className="success">
      <div className="success-card">
        <div className="checkmarkDiv">
          <i className="checkmark">✓</i>
        </div>
        <h1>Success</h1>
        <p>We received your purchase request.<br /> We'll be in touch shortly!</p>
      </div>
    </div>
  );
};

export default Success;