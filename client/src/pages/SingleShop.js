import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; ///new react hook
import { useQuery } from '@apollo/react-hooks';
import { GET_SHOP_BY_ID } from '../utils/queries';
import { Image, Transformation } from 'cloudinary-react';
// import { Logo } from "../components/Logo";
// import { CREATE_RATING, CREAT_REVIEW } from "../utils/mutations";
import SingleShopProducts from '../components/SingleShopProducts'
// adding the cards with slider
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import RatingIcon from './CreateRating';
// for cart
import Cart from '../components/Cart';
import ProductCard from '../components/ProductCard'
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
const Description = tw.p`text-sm leading-loose mt-0 sm:mt-4`;
const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;

function GetSingleShop() {
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
  // const [sliderRef, setSliderRef] = useState(null);
  // const [sliderSettings, setSliderSettings] = useState({
  //   arrows: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   infinite: false,
    // responsive: [
    //   {
    //     breakpoint: 1242,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //     }
    //   },
    //   {
    //     breakpoint: 797,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // ]
  // });
  
  const { id: shopId } = useParams();

  const { loading, data } = useQuery(GET_SHOP_BY_ID, {
    variables: { _id: shopId }
  });

  const shop = data?.shop || [];  
  
  if (loading) {
    return <div>Loading single Shop</div>;
  }

  return (
    <>
    <Cart />
      <div>
        <div>
          <Heading>{shop.name}</Heading>
          <div className="heroDiv">
            <Image style={{ objectFit: 'cover', height: '100%' }} cloudName='dylyqjirh' publicId={shop.hero || 'shopping-bags-500x500_vpqouy'}>
              <Transformation height={600} width={972} crop="fill" />
            </Image>
            <div className='d-flex justify-content-between px-2'>
              <div style={{ marginTop: '8px', fontSize: '20px', fontWeight: 'bold' }}>
                <p>{shop.city}, {shop.state}</p>
                <p>{`(${shop.phone.substr(0, 3)})-${shop.phone.substr(3, 3)}-${shop.phone.substr(6, 4)}`}</p>
              </div>

              <div>
                <CardRatingContainer style={{ position: 'relative', margin: '8px 0', background: 'lightGrey' }}>
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
            <Description style={{ color: '#888888', marginTop: '0px', marginBottom: '8px' }}>
              {shop.description}
            </Description>
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
            <CardSlider className="product-slider">
              {shop.products &&
                shop.products.map((product, index) => (
                  <ProductCard item={product} key={index}/>
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
            />
          ))}


        </Content>
      </Container>
    </>
  );

}

export default GetSingleShop;