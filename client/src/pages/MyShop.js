import React, { useState } from 'react';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_SHOP_BY_ID, MY_SALES } from '../utils/queries'
import { CREATE_CATEGORY, CREATE_PRODUCT, UPDATE_SHOP, UPDATE_PRODUCT } from '../utils/mutations'
import { Image, Transformation } from 'cloudinary-react';
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import Logo from '../components/Logo';
import MyShopProductList from '../components/MyShopProductList';
import UploadProduct from '../components/UploadProduct';
import EditShop from '../components/EditShop';

const Form = tw.form`mx-auto mb-5 max-w-xs px-4 `;
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
  const [prodDescriptionCharCount, setProdDescriptionCharCount] = useState(0);
  const [prodDescriptionText, setProdDescriptionText] = useState('');
  const [createProductError, setCreateProductError] = useState(false);
  const [createProductSuccess, setCreateProductSuccess] = useState(false);
  const [createCategoryError, setCreateCategoryError] = useState(false);
  const [productFormState, setProductFormState] = useState({
    name: '',
    image: '',
    description: prodDescriptionText,
    price: 0,
    stock: 0,
    categoryName: ''
  });

  // Mutations
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{
      query: GET_SHOP_BY_ID
    }]
  });

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{
      query: GET_SHOP_BY_ID
    }]
  });

  // Handle Category Form
  const handleChangeCategoryForm = (e) => {
    e.preventDefault();
    setNewCategory(e.target.value)
  }

  const handleSubmitCategoryForm = async (e) => {
    e.preventDefault();

    try {
      await createCategory({ variables: { name: newCategory } });
      setNewCategory('');
      setCreateCategoryError(false);
    } catch (e) {
      console.log(e);
      setCreateCategoryError(true);
    }
  }

  // Handle Product Form 
  const handleChangeProductForm = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    name = name.substr(5)

    if (name === 'description') {
      setProdDescriptionCharCount(e.target.value.length);
      setProdDescriptionText(e.target.value);
    } 
    else if (name === 'price') {
      setProductFormState({
        ...productFormState,
        [name]: parseFloat(value)
      });
    }
    else if (name === 'stock') {
      setProductFormState({
        ...productFormState,
        [name]: parseInt(value)
      });

    } else {
      setProductFormState({
        ...productFormState,
        [name]: value
      });
    }
  }

  const handleSubmitProductForm = async (e) => {
    e.preventDefault();

    try {
      await createProduct({ variables: { ...productFormState } });
      setProductFormState('');
      setProdDescriptionText('');
      setProdDescriptionCharCount(0);
      setCreateProductError(false);
      setCreateProductSuccess(true);
    } catch (e) {
      setCreateProductError(true);
      setCreateProductSuccess(false);
    }

  }

  // Query Shop
  const { loading, data } = useQuery(GET_SHOP_BY_ID);
  const shop = data?.shop || {}
  if (loading) {
    return <h2>Loading...</h2>
  }

  console.log(productFormState)

  // Auth
  if (!Auth.loggedIn()) {
    return <Redirect to='/' />
  }

  return (
    <>
      <div className='shopHeader'>
        <Logo onClick={() => setNavState('home')} logo={shop.logo || 'Screen_Shot_2021-05-18_at_7.22.02_PM_gu1bfi'} logoScale={80} />
        <h2 onClick={() => setNavState('home')} className='text-center'>{shop.name}</h2>
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

          <h3 className='mt-5'>Description</h3>
          <p className="pl-36">{shop.description}</p>

          <h3 className='mt-5'>Ratings And Reviews</h3>
          <CardRatingContainer style={{ position: 'relative' }}>
            <CardRating>
              {shop.ratingAvg}/5
            <StarIcon />'s
          </CardRating>

            <CardReview>({shop.reviewCount} 'reviews')</CardReview>
          </CardRatingContainer>


          <h3 className='mt-5'>Address</h3>
          <div className="pl-36">
            <p><span>{shop.addressNum}</span>{' '}<span>{shop.street}</span></p>
            <p><span>{shop.city}</span>,{' '}<span>{shop.state}</span>{' '}<span>{shop.zip}</span></p>
          </div>


          <h3 className='mt-5'>Phone</h3>
          <p className="pl-36">{`(${shop.phone.substr(0, 3)})-${shop.phone.substr(3, 3)}-${shop.phone.substr(6, 4)}`}</p>

          <h3 className='mt-5'>Order Fulfillment</h3>
          <div className="pl-36">
            <p>Pickup: {shop.pickup ? '✅' : '❌'}</p>
            <p>Delivery: {shop.delivery ? '✅' : '❌'}</p>
            <p>Shipping: {shop.shipping ? '✅' : '❌'}</p>
          </div>

          <h3 className='mt-5'>Publishable Stripe Key</h3>
          <div className='pl-36'>
            <p className="wrap-text"> {shop.stripeKey}</p>
            <p>StripeKey Verified: {shop.stripeKeyVerified ? '✅' : '❌'}</p>
          </div>

          <h3 className='mt-5'>Categories</h3>
          <p className='pl-36'>
            {shop.categories.map((category, i) => (
              <span key={category._id}>{category.name}{i !== shop.categories.length - 1 && ', '}</span>
            ))}
          </p>

          <h3 className='mt-5'>Products</h3>
          {shop.categories.map(category => (

            <MyShopProductList
              key={category._id}
              category={category}
              products={shop.products.filter(product => product.category._id === category._id)}
            />
          ))}

          <footer className='text-center mb-5'>
            {shop.instagram && <SocialIcon url={shop.instagram} target="_blank" rel="noreferrer" />}
          </footer>
        </main>
      )}

      { navState === 'add-category' && (
        <main className="d-flex-col" >
          <section>
            <h4 className='text-center mb-3'>Add a New Category</h4>
            <Form onSubmit={handleSubmitCategoryForm}>
              <Label htmlFor="categoryName">Category Name</Label>
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

              <p> Current Categories:{' '}
                {shop.categories.map((category, i) => (
                  <span key={category._id}>{category.name}{i !== shop.categories.length - 1 && ', '}</span>
                ))}
              </p>
            </Form>
          </section>
        </main>
      )}


      { navState === 'add-product' && (
        <main className="d-flex-col" >
          <section>
            <h4 className='text-center mb-3'>Add a New Product</h4>
            <Form onSubmit={handleSubmitProductForm}>

              <Label htmlFor="prod-img">Upload Product Image</Label>
              <UploadProduct
                formState={productFormState}
                setFormState={setProductFormState}
              />

              <Label htmlFor="prod-name">Name</Label>
              <Input
                placeholder="Product Name"
                name="prod-name"
                type="text"
                id="prod-name"
                onChange={handleChangeProductForm}
              />

              <Label htmlFor="prod-description">Description {prodDescriptionCharCount}/120</Label>
              <Textarea
                placeholder="Product Description"
                onChange={handleChangeProductForm}
                name="prod-description"
                value={prodDescriptionText}
                id="prod-categoryName"
              />

              <Label htmlFor="prod-categoryName">Category</Label>
              <Input
                placeholder="Product Category"
                name="prod-categoryName"
                type="text"
                id="prod-categoryName"
                onChange={handleChangeProductForm}
              />

              <Label htmlFor="prod-price">Price</Label>
              <Input
                placeholder="Enter a price ex: 3.99"
                name="prod-price"
                type="text"
                id="prod-price"
                onChange={handleChangeProductForm}
              />

              <Label htmlFor="prod-stock">Stock</Label>
              <Input
                placeholder="25"
                name="prod-stock"
                type="text"
                id="prod-stock"
                onChange={handleChangeProductForm}
              />

              <SubmitButton type="submit">
                <span className="text">Add Product</span>
              </SubmitButton>
              {createProductError && <p className='errStyle'>Something Went Wrong!</p>}
              {createProductSuccess && <p className='text-primary'>Success!</p>}

              <p> <strong>Current Products:</strong>{' '}
                {shop.products.map((product, i) => (
                  <span key={product._id}>{product.name}{i !== shop.products.length - 1 && ', '}</span>
                ))}
              </p>

            </Form>
          </section>
        </main>
      )}

      {navState === "update-shop" && <EditShop shop={shop} setNavState={setNavState}/>}

    </>

  )
}

export default MyShop;