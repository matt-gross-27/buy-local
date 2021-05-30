import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; ///new react hook
import { useQuery } from '@apollo/react-hooks';
import { GET_SHOP_BY_ID } from '../utils/queries';
import { Image, Transformation } from 'cloudinary-react';
// import { Logo } from "../components/Logo";
// import { CREATE_RATING, CREAT_REVIEW } from "../utils/mutations";
// import SingleShopProducts from '../components/SingleShopProduct'

// start Matt's code for importing for store review
import CreateReview from "../components/AddReview";
// end import for store reviews


// adding the cards with slider
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
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
// const { SocialIcon } = require('react-social-icons');
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
const Description = tw.p`text-sm leading-loose mt-0 sm:mt-4`;
// const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;

// styling for review box
const ReviewCard = tw.div`flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;

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

  // start matt's code for store reviews formatting
  const ReviewDescription = tw.p`text-gray-900 text-base mt-0 sm:mt-4`
  const ReviewUser = tw.h4`text-purple-700`
  // end Matt's code for formatting store reviews

  const { id: shopId } = useParams();

  const { loading, data } = useQuery(GET_SHOP_BY_ID, {
    variables: { _id: shopId }
  });

  const shop = data?.shop || [];
  console.log(shop)
  // const products = shop.products
  const reviews = shop.reviews

  //start matt changes for addReview
  const [showForm, setShowForm] = useState(false);
  console.log(reviews)
  // end matt changes for addReview

  if (loading) {
    return <div>Loading single Shop</div>;
  }

  return (
    <>
      <Cart />
      <Container>
        <Heading>{shop.name}</Heading>
        <div className="heroDiv">
          <Image className="heroImg" cloudName='dylyqjirh' publicId={shop.hero || 'shopping-bags-500x500_vpqouy'}>
            <Transformation height={600} width={972} crop="fill" />
          </Image>
        </div>

        <div className='d-flex flex-wrap justify-content-between px-2'>
          <div style={{ marginTop: '8px', fontSize: '20px', fontWeight: 'bold' }}>
            <p>{shop.city}, {shop.state}</p>
            <a href={`tel:${shop.phone}`}>{`(${shop.phone.substr(0, 3)})-${shop.phone.substr(3, 3)}-${shop.phone.substr(6, 4)}`}</a>
          </div>

          <div>
            <CardRatingContainer style={{ position: 'relative', margin: '8px 0', background: 'lightGrey' }}>
              <CardRating>
                {shop.ratingAvg}/5
                     <StarIcon />'s
                   </CardRating>

                  <CardReview>({shop.ratingCount} 'reviews')</CardReview>
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

            <div>
            <Description style={{ color: '#888888', marginTop: '0px', marginBottom: '8px' }}>
              {shop.description}
            </Description>
            </div>
            <div style={{ textAlign: "center" }}>
            <button onClick={()=>setShowForm(true)} style={{ color: "white", background: "#6415FF" }} > Write a review </button>
                {
                  showForm?<CreateReview />:null
                }

            </div>


    </Container>

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
                  <ProductCard item={product} key={index} />
                ))}
            </CardSlider>
          </Container>

          {/* {shop.categories.map(category => (
            <SingleShopProducts
              key={category._id}
              category={category}
              products={
                shop.products.filter(product => product.category._id === category._id)
              }
            />
          ))}

          <div style={{height: '80px'}}></div> */}


      <CardSlider className="review-slider">    
              {reviews &&
                reviews.map((review, index) => (
                  <ReviewCard key={index} className="review-card" style={{ width: '300px' }}>
                    {/* <TextInfo>   */}
                      <ReviewUser>{review.user.firstName}</ReviewUser>
                      <ReviewDescription style={{ color: 'black', marginTop: '0px', marginBottom: '8px' }}>
                        {review.reviewText}
                      </ReviewDescription>
                    {/* </TextInfo> */}
                  </ReviewCard>
                ))} 
            </CardSlider>
        </Content>
      </Container>

    </>
  );

}

export default GetSingleShop;