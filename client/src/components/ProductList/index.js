import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

import ProductItem from "../ProductItem";
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { QUERY_PRODUCTS } from "../../utils/queries";
//import spinner from "../../assets/spinner.gif"

function ProductList() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const products = data?.products || [];

  useEffect(() => {
    //if there is data to be stored
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
      // but let's also take each product and save it to IndexedDB using the helper function

      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {

     

        //use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        })
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }
    return state.products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      
    </div>
  );
}

export default ProductList;

