import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; ///new react hook

import { useQuery } from '@apollo/react-hooks';
import { GET_SHOP_BY_ID } from '../utils/queries';
import { Image, Transformation } from 'cloudinary-react';
// import { Logo } from "../components/Logo";
// import { CREATE_RATING, CREAT_REVIEW } from "../utils/mutations";
import SingleShopProducts from '../components/SingleShopProduct'


// adding the cards with slider
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
// import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
// import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
// import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
// import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import RatingIcon from './CreateRating';
import Category from 'components/cards/TabCardGrid';
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;
// end imports for cards and slider

const CardReview = tw.div`font-medium text-xs text-gray-600`;
const { SocialIcon } = require('react-social-icons');
//styling for cards and slider//
const Container = tw.div`relative mx-5`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;

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

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-0 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-0 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;


const GetSingleShop = props => {

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const onMouseEnter = (index) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index) => {
    setRating(index);
  };
  // Slider functionality
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: true,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },

      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const { id: shopId } = useParams();

  const { loading, data } = useQuery(GET_SHOP_BY_ID, {
    variables: { _id: shopId }
  });

  const shop = data?.shop || [];

  console.log(shop)

  const products = shop.products

  if (loading) {
    return <div>Loading single Shop</div>;
  }

  return (
    <>
      <div>
        <div>
          <Heading>{shop.name}</Heading>
          <div className="heroDiv">
            <Image style={{ objectFit: 'cover', height: '100%' }} cloudName='dylyqjirh' publicId={shop.hero || 'shopping-bags-500x500_vpqouy'}>
              <Transformation height={600} width={972} crop="fill" />
            </Image>


            <div className='d-flex justify-content-between px-2'>
              <div style={{ marginTop: '8px' }}>
                {shop.city}, {shop.state} <br />
                <p>Phone: {shop.phone}</p>
              </div>

              <div>
                <CardRatingContainer style={{ position: 'relative', marginTop: '8px', marginBottom: '0', background: 'lightGrey' }}>
                  <CardRating>
                    {shop.ratingAvg}/5
                     <StarIcon />'s
                   </CardRating>

                  <CardReview>({shop.reviewCount} 'reviews')</CardReview>
                </CardRatingContainer>

                <div className="box flex"> {[1, 2, 3, 4, 5].map((index) => {
                  return (
                    <RatingIcon
                      key={index}
                      index={index}
                      rating={rating}
                      hoverRating={hoverRating}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      onSaveRating={onSaveRating} />
                  )
                })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <Content>

          <Heading className="products-header">Our Products</Heading>

          <div className='d-flex flex-wrap justify-content-around'>
            {
              shop.categories.map(category => {
                return shop.products.filter(p => p.category._id === category._id).length === 0 ? (<></>) : (
                  <a key={category._id}
                    href={`#${category.name}-slider`}
                    style={{ padding: '12px' }}
                  >
                    {category.name}
                  </a>
                )
              })
            }
          </div>

          <Container>
            <CardSlider ref={setSliderRef} {...sliderSettings} className="product-slider">
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

          {shop.categories.map(category => (
            <SingleShopProducts
              key={category._id}
              category={category}
              products={
                shop.products.filter(product => product.category._id === category._id)
              }
              setSliderRef={setSliderRef}
              sliderSettings={sliderSettings}
            />
          ))}


        </Content>
      </Container>
    </>
  );

}

export default GetSingleShop;