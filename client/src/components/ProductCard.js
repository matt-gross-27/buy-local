import React from 'react';
import tw from "twin.macro";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from "../utils/helpers"
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";

// end imports for cards and slider
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-1 sm:px-1 sm:py-1`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;
const Description = tw.p`text-sm leading-loose mt-0 sm:mt-4`;
const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-4`;

function ProductCard({ item }) {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { cart } = state;

  const addToCart = () => {
    // check for matching id in cart
    const itemInCart = cart.find((cartItem) => cartItem._id === item._id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      })
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', {
        ...item, 
        purchaseQuantity: 1
      });
    }
  };

  return (
    <Card>
      <CardImage imageSrc={
        item.image ? `https://res.cloudinary.com/dylyqjirh/image/upload/v1621788774/${item.image}` : 'https://res.cloudinary.com/dylyqjirh/image/upload/v1621475439/Screen_Shot_2021-05-18_at_7.22.02_PM_gu1bfi.png'
      } />

      <TextInfo>
        <TitleReviewContainer>
          <Title>{item.name}<br />
            <small style={{ color: 'dark' }}>${item.price}</small>

          </Title>
        </TitleReviewContainer>

        <Description style={{ color: '#888888', marginTop: '0px', marginBottom: '0px', height: '50px', overflow: 'scroll' }}>
          {item.description}
        </Description>

        <em className='cardStock'>{item.stock} item(s) left</em>
      </TextInfo>

      <PrimaryButton onClick={addToCart}>{item.stock === 0 ? 'Sold Out' : 'Add to Cart'}</PrimaryButton>
    </Card>
  )
}

export default ProductCard;