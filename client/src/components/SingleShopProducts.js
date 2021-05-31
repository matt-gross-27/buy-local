import React from 'react';
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import ProductCard from '../components/ProductCard'

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`flex justify-center mb-1`}
  }
`;
const Title = tw.h5`text-2xl font-bold`;
const Container = tw.div`relative mx-5`;

function SingleShopProducts({ products, category, setSliderRef, sliderSettings }) {
  if (products.length > 0) {
    return (
      <>
        <Title id={`${category.name}-slider`} className='sectionHeading'>{category.name}</Title>

        <Container>
          <CardSlider className="product-slider">
            {products &&
              products.map((product, index) => (
                <ProductCard item={product} key={index}/>
              ))}
          </CardSlider>
        </Container>
      </>
    )
  } else {
    return <></>
  }
}

export default SingleShopProducts;
