import React from 'react';
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { Subheading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);
const TextInfo = tw.div`py-1 sm:px-1 sm:py-1`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;
const Description = tw.p`text-sm leading-loose mt-0 sm:mt-4`;
const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
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
                <Card key={index} style={{ width: '300px' }}>
                  <CardImage imageSrc={
                    product.image ? `https://res.cloudinary.com/dylyqjirh/image/upload/v1621788774/${product.image}` : 'https://res.cloudinary.com/dylyqjirh/image/upload/v1621475439/Screen_Shot_2021-05-18_at_7.22.02_PM_gu1bfi.png'
                  } />
                  <TextInfo>
                    <TitleReviewContainer>
                      <Title>{product.name}<br />
                        <small style={{ color: 'dark' }}>${product.price}</small>

                      </Title>
                    </TitleReviewContainer>

                    <Description style={{ color: '#888888', marginTop: '0px', marginBottom: '8px' }}>
                      {product.description}
                    </Description>

                    <p>{product.stock} item(s) left</p>
                  </TextInfo>
                  <PrimaryButton>{product.stock === 0 ? 'Sold Out' : 'Add to Cart'}</PrimaryButton>
                </Card>
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
