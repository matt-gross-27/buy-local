import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { CREATE_SHOP } from "../utils/mutations";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "images/signup-illustration.svg";
import logo from "images/logo.svg";
import UploadLogo from '../components/UploadLogo'
import UploadHero from '../components/UploadHero'
import Header from "components/headers/light.js";

const Container = tw(ContainerBase)`min-h-screen bg-gray-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12 px-0`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xs`;
const Label = tw.label`max-w-full text-sm`;
const Input = tw.input`w-full py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5 mb-5 mt-1 mb-6 last:mb-0`;
const Textarea = tw.textarea`w-full py-4 rounded-lg h-20 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5 mt-1 mb-6 last:mb-0`;
const Select = tw.select`w-full py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5 mt-1 mb-6 last:mb-0`
const SubmitButton = styled.button`
  ${tw`mt-5 w-full py-4 rounded-lg tracking-wide font-semibold bg-red-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-sm focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

const errStyle = { color: 'red', margin: '0' }

function AddShop(props) {
  const [createShop, { error }] = useMutation(CREATE_SHOP);
  const [descriptionCharCount, setDescriptionCharCount] = useState(0);
  const [descriptionText, setDescriptionText] = useState('');
  const [phoneCharCount, setPhoneCharCount] = useState(0);
  const [phoneText, setPhoneText] = useState('');
  const [logoId] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    shopType: 'Other',
    phone: '',
    logo: logoId,
    instagram: '',
    addressNum: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    stripeKey: '',
    pickup: false,
    delivery: false,
    shipping: false,
    hero: '',
  });

  const [validInstagram, SetValidInstagram] = useState(true)
  const validateInstagram = (event) => {
    const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    if (!regex.test(event.target.value) && event.target.value.length !== 0) {
      SetValidInstagram(false);
    } else {
      SetValidInstagram(true)
    }
  }

  const handleChange = event => {
    const { name, value } = event.target;

    if (event.target.name === 'description') {
      if (event.target.value.length < 280) {
        setDescriptionText(event.target.value);
        setDescriptionCharCount(event.target.value.length);
      }
    }

    if (event.target.name === 'phone') {
      if (event.target.value.length <= 10) {
        setPhoneText(event.target.value);
        setPhoneCharCount(event.target.value.length);
      }
    }

    if (event.target.name === 'pickup' || event.target.name === 'delivery' || event.target.name === 'shipping') {
      if (event.target.checked) {

        setFormState({
          ...formState,
          [name]: true
        });
      } else {
        setFormState({
          ...formState,
          [name]: false
        });
      }
    } else {

      setFormState({
        ...formState,
        [name]: value
      });
    }
  };

  console.log(formState)

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      if (Auth.loggedIn()) {

        const { data } = await createShop({
          variables: { ...formState }
        });
        
        <Redirect to={`/shop/${data.createShop._id}`} />
        console.log(data);
      }

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <AnimationRevealPage>
    <Header />
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href="/">
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>Create a Shop</Heading>
              <FormContainer>
                <Form onSubmit={handleFormSubmit}>
                  <Label htmlFor="name">Shop Name</Label>
                  <Input
                    placeholder="Enter your shop's name"
                    name="name"
                    type="text"
                    id="name"
                    onChange={handleChange}
                  />

                  <Label htmlFor="description">Description: {descriptionCharCount}/280</Label>
                  <Textarea
                    placeholder="Please enter a description of your shop"
                    name="description"
                    type="text"
                    value={descriptionText}
                    id="description"
                    onChange={handleChange}
                  />

                  <p style={{ fontSize: '14px', color: '#1a202c' }}>Upload a hero image (cropped to 1.62 x 1)</p>
                  <UploadHero formState={formState} setFormState={setFormState} />

                  <Label htmlFor="shopType">Type</Label>
                  <Select defaultValue="Select" name="shopType" id="shopType" onChange={handleChange}>
                    <option disabled value="Select">Select One</option>
                    <option value="Food">Food</option>
                    <option value="Sweets">Sweets</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Other">Other</option>
                  </Select>

                  <Label htmlFor="phone">Phone Number {phoneCharCount}/10</Label>
                  <Input
                    placeholder="Enter your shop's phone number"
                    name="phone"
                    type="text"
                    id="phone"
                    value={phoneText}
                    onChange={handleChange}
                  />

                  <p style={{ fontSize: '14px', color: '#1a202c' }}>Upload your logo (cropped to circle)</p>
                  <UploadLogo formState={formState} setFormState={setFormState} editProperty={'logo'} />

                  <Label htmlFor="instagram">Link your Instagram (optional)</Label>
                  {!validInstagram && <p style={errStyle}>Please enter a valid url</p>}
                  <Input
                    placeholder="Enter your instagram's url"
                    name="instagram"
                    type="text"
                    id="instagram"
                    onChange={handleChange}
                    onBlur={validateInstagram}
                  />

                  <p>Where is your shop located?</p>
                  <Label htmlFor="addressNum">Address number</Label>
                  <Input
                    placeholder="123..."
                    name="addressNum"
                    type="text"
                    id="addressNum"
                    onChange={handleChange}
                  />

                  <Label htmlFor="street">Street</Label>
                  <Input
                    placeholder="Rodeo Drive"
                    name="street"
                    type="text"
                    id="street"
                    onChange={handleChange}
                  />

                  <Label htmlFor="city">City</Label>
                  <Input
                    placeholder="Los Angeles"
                    name="city"
                    type="text"
                    id="city"
                    onChange={handleChange}
                  />

                  <Label htmlFor="state">State</Label>
                  <Input
                    placeholder="CA"
                    name="state"
                    type="text"
                    id="state"
                    onChange={handleChange}
                  />

                  <Label htmlFor="zip">Zip</Label>
                  <Input
                    placeholder="90212"
                    name="zip"
                    type="text"
                    id="zip"
                    onChange={handleChange}
                  />

                  <p>How do fulfill orders?</p>
                  <div style={{ marginBottom: '24px' }}>
                    <Label htmlFor="pickup">Do you offer Pickup?</Label>
                    <input type="checkbox" id="pickup" name="pickup" onChange={handleChange} />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <Label htmlFor="delivery">Do you offer Delivery?</Label>
                    <input type="checkbox" id="delivery" name="delivery" onChange={handleChange} />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <Label htmlFor="shipping">Do you offer Shipping?</Label>
                    <input type="checkbox" id="shipping" name="shipping" onChange={handleChange} />
                  </div>
                  

                  <Label htmlFor="stripeKey">Your Stripe "Publishable API Key"{' '}
                    <a href="https://help.sharetribe.com/en/articles/1055989-configure-stripe-and-get-api-keys-for-a-marketplace" target="_blank" rel="noreferrer">Help</a>
                  </Label>
                  <Input type="text" id="stripeKey" name="stripeKey" onChange={handleChange} placeholder="pk_test_51IuQkzK8LDLnAfHfS1K5CwJUrqEy882guKDlt5gmtKXHZQ9lbfoYj6Yd87o6ukuaGqVuRB5ombT8kujXkXno3dzp00GtbMjd56"/>

                  <SubmitButton type="submit">
                    <span className="text">Create Shop</span>
                  </SubmitButton>

                  <p style={errStyle}>{error && 'Something Went Wrong!'}</p>
                </Form>

              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustration} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );

};

export default AddShop;
