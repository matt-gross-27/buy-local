import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; ///new react hook
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_SHOP_BY_ID } from '../utils/queries';
import { Image, Transformation } from 'cloudinary-react';
// import { Logo } from "../components/Logo";
// import { CREATE_RATING, CREAT_REVIEW } from "../utils/mutations";
import SingleShopProducts from '../components/SingleShopProduct'

// importing for store review
import { ReactComponent as ArrowLeftIcon } from "images/arrow-left-3-icon.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-3-icon.svg";
import { CREATE_REVIEW } from "../utils/mutations";
import CreateReview from "../components/AddReview";
//import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
// end import for store reviews


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
// import Category from 'components/cards/TabCardGrid';
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
  const [sliderSettings, setSliderSettings] = useState({
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
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
  });

  //matt's code for store reviews
  const [reviewSliderRef, setReviewSliderRef] = useState(null)
  
  const TestimonialSlider = styled(Slider)`
  ${tw`w-full mt-10 text-center md:text-left`}
  .slick-track {
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
  
  const Testimonial = tw.div`outline-none h-full flex! flex-col`;
  const TestimonialHeading = tw.div`mt-4 text-xl font-bold`;
  const Quote = tw.blockquote`mt-4 mb-8 sm:mb-10 leading-relaxed font-medium text-gray-700`;
  const CustomerInfoAndControlsContainer = tw.div`mt-auto flex justify-between items-center flex-col sm:flex-row`;
  const CustomerInfo = tw.div`flex flex-col sm:flex-row items-center justify-center lg:justify-start`;
  const CustomerTextInfo = tw.div`text-center md:text-left sm:ml-6 mt-2 sm:mt-0`;
  const CustomerName = tw.h5`font-bold text-xl`;

  const Controls = styled.div`
  ${tw`flex mt-8 sm:mt-0`}
  .divider {
    ${tw`my-3 border-r`}
  }
  `;
  const ControlButton = styled.button`
  ${tw`mx-3 p-4 rounded-full transition duration-300 bg-gray-200 hover:bg-gray-300 text-primary-500 hover:text-primary-700 focus:outline-none focus:shadow-outline`}
  svg {
    ${tw`w-4 h-4 stroke-3`}
  }
  `;

  




  // end Matt's code for store reviews

  const { id: shopId } = useParams();

  const { loading, data } = useQuery(GET_SHOP_BY_ID, {
    variables: { _id: shopId }
  });

  const shop = data?.shop || [];

  console.log(shop)

  const products = shop.products

  const reviews = shop.reviews

  //start matt changes for addReview

  const [showForm, setShowForm] = useState(false);

  //const reviews = shop.reviews

  
    
  const [createReview, { error }] = useMutation(CREATE_REVIEW);
  const [reviewTextCharCount, setReviewTextCharCount] = useState(0);
  const [success, setSuccess] = useState(false)
  // const [success, setSuccess] = useState(false)
  const [reviewText, setReviewText] = useState('');
  const [formState, setFormState] = useState({
      
      reviewText: ''
});

  console.log(reviews)

  // const handleChange = event => {
  //   const { name, value } = event.target;

  //   if (event.target.name === 'reviewText') {
  //       if (event.target.value.length < 150) {
  //           setReviewText(event.target.value);
  //           setReviewTextCharCount(event.target.value.length);
  //           console.log(reviewText)
  //       }
  //   } else {

  //       setFormState({
  //         ...formState,
  //         [name]: value
  //       });
  //     }

  // }

  //   const handleFormSubmit = async event => {
  //       event.preventDefault();

  //       try {
  //           if (Auth.loggedIn()) {
                
  //               const { data } = await createReview({
  //                   variables: { ...formState, shopId }
  //               });



  //               if (data) {
  //                   setSuccess(true);
  //                   console.log(reviewText)
  //                   console.log('clicked')
  //               }
  //           }
            

  //       } catch (error) {
  //           console.log(error)
  //           console.log('failed submit')
  //           console.log(reviewText)
  //       }

  //   };

  
  // end matt's changes for addReview

  const newCreateReview = async(reviewText) => {
    try {
      await createReview({
        variables: { shopId: shopId, reviewText: reviewText }
      })
    } catch (error){
      console.log(error)
      console.log(reviewText)
    }
  }

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

                  <CardReview>({shop.ratingCount} 'reviews')
                  
                  </CardReview>

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

            <button onClick={()=>setShowForm(true)} > Write a review </button>
                {
                  showForm?<CreateReview />:<div></div>
                }

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

          {/* {shop.categories.map(category => (
            <SingleShopProducts
              key={category._id}
              category={category}
              products={
                shop.products.filter(product => product.category._id === category._id)
              }
              setSliderRef={setSliderRef}
              sliderSettings={sliderSettings}
            />
          ))} */}

    


        </Content>
      </Container>

      <Container>
 

        
          </Container>
    </>
  );

}

export default GetSingleShop;