import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { CREATE_USER } from "../utils/mutations";


import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import signupImage from "images/signup-image.jpg";
// import googleIconImageSrc from "images/google-icon.png";
// import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";

const Container = tw(ContainerBase)`min-h-screen bg-gray-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;


const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 pb-6 inline-block text-sm text-red-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-red-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-sm focus:outline-none`}
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

function Signup(props) {
  
  const [formState, setFormState] = useState({
      email: '',
      password: ''
  });
  const [createUser, { error }] = useMutation(CREATE_USER);

  
  const handleFormSubmit = async event => {
      event.preventDefault();
      try{ const mutationResponse = await createUser({
          variables: {
              email: formState.email, password: formState.password,
              firstName: formState.firstName, lastName: formState.lastName
          }
      });
      const token = mutationResponse.data.createUser.token;
      Auth.login(token);
    } catch (e) {
      console.error(e);
    }
  };
  
  const handleChange = event => {
      const { name, value } = event.target;
      setFormState({
          ...formState,
          [name]: value
      });
  };

// export default ({
//   logoLinkUrl = "#",
//   illustrationImageSrc = illustration,
//   headingText = "Sign Up For Treact",
//   submitButtonText = "Sign Up",
//   SubmitButtonIcon = SignUpIcon,
//   tosUrl = "#",
//   privacyPolicyUrl = "#",
//   signInUrl = "#"


return (
  <AnimationRevealPage>
    <Container>
      <Content>
        <MainContainer>
          <MainContent>
            <Heading>Sign up for Buy Local</Heading>
            <FormContainer>

              <DividerTextContainer>
              {error && <DividerText> Sign Up Failed </DividerText>}
              </DividerTextContainer>
              <Form onSubmit={handleFormSubmit}>
                <Input
                placeholder="Please enter your First name"
                name="firstName"
                type="firstName"
                id="firstName"
                onChange={handleChange}
                />
                <Input
                placeholder="Please enter your Last name"
                name="lastName"
                type="lastName"
                id="lastName"
                onChange={handleChange}
                />
                <Input 
                  type="email" 
                  placeholder="Email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                   />
                <Input 
                  type="password" 
                  placeholder="Password (must be 8 or more characters)"
                  name="password"
                  id="password"
                  onChange={handleChange} 
                  />
                <SubmitButton type="submit">
                  <SignUpIcon />
                  <span className="text">Submit</span>
                </SubmitButton>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by Buy Locals{" "}
                  <a href="/terms-of-service" >
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a href="/privacy-policy">
                    Privacy Policy
                  </a>
                </p>

                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href="/login">
                    Login
                  </a>
                </p>
              </Form>
              
            </FormContainer>
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc={signupImage} />
        </IllustrationContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
);

};

export default Signup;
