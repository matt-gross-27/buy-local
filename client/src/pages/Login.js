import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth.js';

//imported styles
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
// import illustration from "images/login-illustration.svg";
import logo from "images/logo.PNG";
import loginImage from "images/login-image.jpg";
// import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";


const Container = tw(ContainerBase)`min-h-screen bg-gray-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

// const SocialButtonsContainer = tw.div`flex flex-col items-center`;
// const SocialButton = styled.a`
//   ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-sm text-sm mt-5 first:mt-0`}
//   .iconContainer {
//     ${tw`bg-white p-2 rounded-full`}
//   }
//   .icon {
//     ${tw`w-4`}
//   }
//   .text {
//     ${tw`ml-4`}
//   }
// `;

const DividerTextContainer = tw.div`my-12 mb-2 border-b text-center relative`;
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
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const Login = props => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = event => {
    const { name, value } = event.target;
    console.log(value);
    setFormState({
      ...formState,
      [name]: value
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState }
      });

      Auth.login(data.login.token);

    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: ''
    });
  };


  // logoLinkUrl = "#",
  //   illustrationImageSrc = illustration,
  //   headingText = "Sign In To Treact",
    // socialButtons = [
    //   {
    //     iconImageSrc: googleIconImageSrc,
    //     text: "Sign In With Google",
    //     url: "https://google.com"
    //   },
    //   {
    //     iconImageSrc: twitterIconImageSrc,
    //     text: "Sign In With Twitter",
    //     url: "https://twitter.com"
    //   }
    // ],
    //submitButtonText = "Sign In",
    // SubmitButtonIcon = LoginIcon,
    // forgotPasswordUrl = "#",
    // signupUrl = "/signup",



return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href="/">
              <LogoImage src={logo} style={{width:'70px', height: '70px'}} alt="logo" />
            </LogoLink>
            <MainContent>
              <Heading>Sign In To Buy Local</Heading>
              <FormContainer>
                <DividerTextContainer>
                  <DividerText>{error && <div> Login Failed </div>}</DividerText>
                </DividerTextContainer>
                <Form onSubmit={handleFormSubmit}>
                  <Input 
                    type="email" 
                    placeholder="Email"
                    name="email"
                    id="email"
                    value={formState.email}
                    onChange={handleChange} />
                  <Input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    id="password"
                    value={formState.password}
                    onChange={handleChange} />
                  <SubmitButton type="submit">
                    {/* //<SubmitButtonIcon className="icon" /> */}
                    <span className="text" type="submit">Sign In</span>
                  </SubmitButton>
                </Form>
                
                {/* <p tw="mt-6 text-xs text-gray-600 text-center">
                  <a href={forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
                    Forgot Password ?
                </a>
                </p> */}
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Don't have an account?{" "}
                  <a href="/signup" tw="border-b border-gray-500 border-dotted">
                    Sign Up
                </a>
                </p>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={loginImage} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );

  };

  export default Login;