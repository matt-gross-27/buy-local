import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import './style.css';
import Auth from '../../utils/auth';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from "../../utils/helpers";
import { QUERY_CHECKOUT } from '../../utils/queries';
import { useLazyQuery } from '@apollo/react-hooks';
import { loadStripe } from '@stripe/stripe-js';
import { Link, useParams } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function Cart() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { id: shop } = useParams();

  // useLazyQuery HOOK for onclick queries (vs useQuery for on render);
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then(res => {
        res.redirectToCheckout({ sessionId: data.checkout.session })
      })
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({
        type: ADD_MULTIPLE_TO_CART,
        products: [...cart]
      });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });

    if (!sum) {
      return '$...'
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(sum);
  }

  function submitCheckout() {
    const orderInput = {
      shop,
      purchases: []
    }

    state.cart.forEach(item => {
      orderInput.purchases.push({
        purchaseQuantity: item.purchaseQuantity,
        product: item._id,
      });
    });

    getCheckout({
      variables: { orderInput: orderInput }
    });
  }



  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span
          role="img"
          aria-label="open cart"
        >🛒</span>
      </div>
    )
  }

  return (
    <div className="cart">
      <span onClick={toggleCart} className="close" role="img" aria-label="close cart">❌</span>
      <h2>Shopping Cart</h2>

      {state.cart.length ? (
        <div>
          {state.cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}

          <strong className="cart-total">
            Total: {calculateTotal()}
          </strong>
          {
            Auth.loggedIn() ?
              <button className="checkout" onClick={submitCheckout}>
                Checkout
              </button>
              :

              <button disabled className="checkout" onClick={submitCheckout}>
                <Link to='/login'>Login to Checkout</Link>
              </button>

          }
        </div>
      ) : (
        <h4>
          <span role="img" aria-label="shocked">
            😱{' '}
          </span>
          No Items!
        </h4>
      )}
    </div>
  );
}

export default Cart;