import React, { useState } from 'react';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_SHOP_BY_ID, MY_SALES } from '../utils/queries'
import { UPDATE_SHOP, CREATE_CATEGORY, CREATE_PRODUCT, UPDATE_PRODUCT } from '../utils/mutations'
import { Image, Transformation } from 'cloudinary-react';
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import Logo from '../components/Logo'

const Form = tw.form`mx-auto max-w-xs`;
const Label = tw.label`max-w-full text-sm`;
const Input = tw.input`w-full py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5 mb-5 mt-1 mb-6 last:mb-0`;
const Textarea = tw.textarea`w-full py-4 rounded-lg h-20 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5 mt-1 mb-6 last:mb-0`;
const Select = tw.select`w-full py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5 mt-1 mb-6 last:mb-0`
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;
const CardReview = tw.div`font-medium text-xs text-gray-600`;
const SubmitButton = styled.button`
  ${tw`mt-5 w-full py-4 rounded-lg tracking-wide font-semibold bg-red-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-sm focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const { SocialIcon } = require('react-social-icons');

function MyShop() {

  // state
  const [navState, setNavState] = useState('home');
  const [newCategory, setNewCategory] = useState('')

  // Mutations
  const { error } = useMutation(CREATE_CATEGORY)

  // Handle Form Change
  const handleChangeCategoryForm = (e) => {
    e.preventDefault();
    setNewCategory(e.target.value)
  }

  const handleSubmitCategoryForm = (e) => {
    e.preventDefault();
    console.log(e)
  }

  // Query Shop
  const { loading, data } = useQuery(GET_SHOP_BY_ID);
  const shop = data?.shop || {}
  if (loading) {
    return <h2>Loading...</h2>
  }

  // Auth
  if (!Auth.loggedIn()) {
    return <Redirect to='/' />
  }

  return (
    <>
      <div className='shopHeader'>
        <Logo logo={shop.logo || 'Screen_Shot_2021-05-18_at_7.22.02_PM_gu1bfi'} logoScale={80} />
        <h2 className='text-center'>{shop.name}</h2>
        <nav className="d-flex justify-content-around flex-wrap">

          <span title='Click To Toggle' className='shopNav'>{shop.open ? 'Open' : 'Closed'}</span>
          <span className='shopNav' onClick={() => setNavState('update-shop')}>Edit Shop Info</span>
          <span className='shopNav' onClick={() => setNavState('add-category')}>Add Category</span>
          <span className='shopNav' onClick={() => setNavState('add-product')}>Add Product</span>
        </nav>
      </div>

      { navState === 'home' && (
        <main className='container my-3'>
          <div className='heroDiv'>
            <Image style={{ objectFit: 'cover', height: '100%' }} cloudName='dylyqjirh' publicId={shop.hero || 'shopping-bags-500x500_vpqouy'}>
              <Transformation height={600} width={972} crop="fill" />
            </Image>
          </div>

          <h2>Description</h2>
          <p className="pl-36">{shop.description}</p>

          <h2>Ratings And Reviews</h2>
          <CardRatingContainer style={{ position: 'relative' }}>
            <CardRating>
              {shop.ratingAvg}/5
            <StarIcon />'s
          </CardRating>

            <CardReview>({shop.reviewCount} 'reviews')</CardReview>
          </CardRatingContainer>


          <h3>Address</h3>
          <div className="pl-36">
            <p><span>{shop.addressNum}</span>{' '}<span>{shop.street}</span></p>
            <p><span>{shop.city}</span>,{' '}<span>{shop.state}</span>{' '}<span>{shop.zip}</span></p>
          </div>


          <h3>Phone</h3>
          <p className="pl-36">{`(${shop.phone.substr(0, 3)})-${shop.phone.substr(3, 3)}-${shop.phone.substr(6, 4)}`}</p>

          <h3>Order Fulfillment</h3>
          <div className="pl-36">
            <p>Pickup: {shop.pickup ? '✅' : '❌'}</p>
            <p>Delivery: {shop.delivery ? '✅' : '❌'}</p>
            <p>Shipping: {shop.shipping ? '✅' : '❌'}</p>
          </div>

          <h3>Publishable Stripe Key</h3>
          <div className='pl-36'>
            <p className="wrap-text"> {shop.stripeKey}</p>
            <p>StripeKey Verified: {shop.stripeKeyVerified ? '✅' : '❌'}</p>
          </div>

          <h3>Product Categories {shop.categoryCount}</h3>
          <p className='pl-36'>
            {shop.categories.map((category, i) => (
              <span key={category._id}>{category}{i !== shop.categories.length - 1 && ', '}</span>
            ))}
          </p>

        </main>
      )}

      { navState === 'add-category' && (
        <main className="d-flex-col" style={{ height: 'calc(100vh - 226px)' }}>
          <section>
            <h3 className='text-center'>Product Categories {shop.categoryCount}</h3>
            <p className='pl-36'>
              {shop.categories.map((category, i) => (
                <span key={category._id}>{category}{i !== shop.categories.length - 1 && ', '}</span>
              ))}
            </p>
            <Form onSubmit={handleSubmitCategoryForm}>
              <Label htmlFor="categoryName">Shop Name</Label>
              <Input
                placeholder="Enter your new category name"
                name="categoryName"
                type="text"
                value={newCategory}
                id="categoryName"
                onChange={handleChangeCategoryForm}
              />

              <SubmitButton type="submit">
                <span className="text">Add Category</span>
              </SubmitButton>
            </Form>
          </section>
        </main>
      )}

      <footer className='text-center mb-5'>
        {shop.instagram && <SocialIcon url={shop.instagram} target="_blank" rel="noreferrer" />}
      </footer>
      {/* <li>{shop.ratings}</li>
      <li>{shop.products}</li>
      <li>{shop.reviews}</li>
      <li>{shop.sales}</li>
      <li>{shop.categories}</li> */}

    </>

  )
}

export default MyShop;