import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_SHOP_BY_ID } from '../utils/queries';

import Slider from "react-slick";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { Image, Transformation } from 'cloudinary-react';
import { SectionHeading } from "components/misc/Headings";
import SingleShopProducts from '../components/SingleShopProducts'
import CreateReview from "../components/AddReview";
import Cart from '../components/Cart';
import ProductCard from '../components/ProductCard'
import RatingIcon from './CreateRating';

const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;
const CardReview = tw.div`font-medium text-xs text-gray-600`;
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

  const { id: shopId } = useParams();

  const [showForm, setShowForm] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

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
                  onSaveRating={onSaveRating}
                />
              )
            })}
            </div>
          </div>
        </div>
        <Description style={{ color: '#888888', marginTop: '0px', marginBottom: '8px' }}>
          {shop.description}
        </Description>
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

          {shop.categories.map(category => (
            <SingleShopProducts
              key={category._id}
              category={category}
              products={
                shop.products.filter(product => product.category._id === category._id)
              }
            />
          ))}
          <hr />
          <div style={{ textAlign: "center", marginBottom: '14px' }}>
            <button onClick={() => setShowForm(!showForm)} style={{ color: "white", background: "#6415FF", width: '100%', fontWeight: 'bold', fontSize: '20px' }} > Write a review </button>
            {
              showForm ? <CreateReview /> : null
            }

          </div>
          <section className='review-section'>
            <div onClick={() => setShowReviews(!showReviews)} style={{ background: '#6415FF', color: 'white', padding: '10px' }}>
              <Heading style={{ fontSize: '28px' }}>
                View {shop.reviewCount} Review(s)
              </Heading>
            </div>

            {showReviews &&
              shop.reviews.reverse().map(review => (
                <article style={{ padding: '16px', borderBottom: '1px solid silver' }}>
                  <h5 style={{ fontSize: '16px' }}>
                    {review.user.firstName} on {review.createdAt}
                  </h5>
                  <p style={{ lineBreak: 'anywhere', fontSize: '12px' }}>
                    {review.reviewText}
                  </p>
                </article>
              ))}
          </section>


          <div style={{ height: '80px' }}></div>

        </Content>
      </Container>
    </>
  );

}

export default GetSingleShop;