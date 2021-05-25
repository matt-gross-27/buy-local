import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; ///new react hook

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_SHOP_BY_ID } from '../utils/queries';
import {Image, Transformation } from 'cloudinary-react';
import {Logo} from "../components/Logo";
import { CREATE_RATING, CREAT_REVIEW } from "../utils/mutations";



// adding the cards with slider
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
// end imports for cards and slider
const { SocialIcon } = require('react-social-icons');
//styling for cards and slider
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
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
        // Slider functionality
        const [sliderRef, setSliderRef] = useState(null);
        const sliderSettings = {
          arrows: false,
          slidesToShow: 3,
          responsive: [
            {
              breakpoint: 1280,
              settings: {
                slidesToShow: 2,
              }
            },
      
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 1,
              }
            },
          ]
        };
  
  const { id: shopId } = useParams();
   
    const { loading, data } = useQuery(GET_SHOP_BY_ID, {
      variables: { _id: shopId }
    });
  
    const shop = data?.shop || [];

    console.log(shop)

    const products = shop.products

    const reviews = shop.reviews

    const ratings = shop.ratings
  
    if (loading) {
      return <div>Loading single Shop</div>;
    }

    // Cards import dynamically from products
    // const cards = [
    //   {
    //     imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
    //     title: `${products.name}`,
    //     description: `${products.description}`,
    //     pricingText: `${products.price}`,
    //     rating: "4.8",
    //   },
    // ]

    return (
       <>
       <div>
          <div>
            <p className="single-shop-name">
              <span style={{ fontWeight: 700 }} id="single-shop-name">
                {shop.name}
              </span>
            </p>
            <div className="heroDiv">
            <Image style={{ objectFit: 'cover', height: '100%' }} cloudName='dylyqjirh' publicId={shop.hero || 'shopping-bags-500x500_vpqouy'}>
            <Transformation height={600} width={972} crop="fill" />
           </Image>
            </div>
            <div className="single-shop-body">
              <p>Description: {shop.description}</p>
              <p>Location: {shop.city}, {shop.state}</p>
              <p>Phone Number: {shop.phone}</p>
              <p>Pickup Allowed? {shop.pickup}</p>
              <p>Delivery Allowed? {shop.delivery}</p>
              <p>Shipping Allowed? {shop.shipping}</p>
              <p>Rating Average: {shop.ratingAvg} <StarIcon /></p>
              <p>{shop.reviewCount} Reviews about this Shop</p>
            </div>
            <div className="single-shop-instagram">
            Checkout our Instagram: {shop.instagram && <SocialIcon url={shop.instagram} target="_blank" rel="noreferrer" />}
            </div>
            <div>
                <div>
              </div>
            </div>
          </div>
        </div>

      <Container>
      <Content>
        <HeadingWithControl>
          <Heading className="products-header">See our Products</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
            <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {products &&
          products.map((product, index) => (
            <Card key={index}>
              <CardImage imageSrc={product.image} />
              <TextInfo>
                <TitleReviewContainer>
                  <Title>{product.name}</Title>
                </TitleReviewContainer>
                <SecondaryInfoContainer>
                  <IconWithText>
                  </IconWithText>
                  <IconWithText>
                    <IconContainer>
                      <PriceIcon />
                    </IconContainer>
                    <Text>Selling for: ${product.price}</Text>
                  </IconWithText>
                </SecondaryInfoContainer>
                <Description>Product Description: {product.description}</Description>
                <Text>Stock left: {product.stock}</Text>
              </TextInfo>
              <PrimaryButton>Add to Cart</PrimaryButton>
            </Card>
          ))}
        </CardSlider>


        <HeadingWithControl>
          <Heading>See reviews for this shop</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
            <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {reviews &&
          reviews.map((review, index) => (
            <Card key={index}>
              <TextInfo>
                <TitleReviewContainer>
                  <Title>"{review.reviewText}"</Title>
                  <RatingsInfo>
                    <StarIcon />
                    <Rating>{review.stars}</Rating>
                  </RatingsInfo>
                </TitleReviewContainer>
                <SecondaryInfoContainer>
                  <IconWithText>
                    <Text>Wrote on: {review.createdAt}</Text>
                  </IconWithText>
                </SecondaryInfoContainer>
              </TextInfo>
            </Card>
          ))}
        </CardSlider>
        <PrimaryButton className="add-rating-button">Add a Rating</PrimaryButton>
        <PrimaryButton className="add-review-button">Add a Review</PrimaryButton>
      </Content>
    </Container>



        </>
      );
   
}

export default GetSingleShop;