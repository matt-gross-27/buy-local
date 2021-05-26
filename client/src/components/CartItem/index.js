/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });
  };

  const handleChangeQuantity = (e) => {
    const value = e.target.value;

    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: Math.abs(parseInt(value))
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  const handleBlurQuantity = (e) => {
    const value = e.target.value;

    if (value === '') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });
    }
  }

  return (
    <div className="flex-row cart-item">
      <h4 className="item-name">{item.name}, ${item.price}</h4>
      <img
        src={item.image ? `https://res.cloudinary.com/dylyqjirh/image/upload/v1621788774/${item.image}` : 'https://res.cloudinary.com/dylyqjirh/image/upload/v1621475439/Screen_Shot_2021-05-18_at_7.22.02_PM_gu1bfi.png'}
        alt=""
      />
      <div className="cart-item-details">
        <div className="d-flex">
          <span>Qty:</span>
          <input
            type="number"
            min="0"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={handleChangeQuantity}
            onBlur={handleBlurQuantity}
          />
          <span onClick={removeFromCart} className="trash" role="img" aria-label="trash">
            🗑
          </span>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default CartItem;