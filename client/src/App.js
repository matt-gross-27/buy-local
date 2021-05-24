import './styles/globalStyles.css';
// import "./tailwindcss/dist/base.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import ComponentRenderer from "./ComponentRenderer";
import { useQuery } from '@apollo/react-hooks'
import { USER } from './utils/queries'

import Home from './pages/Home';
import Nav from './components/Nav';
import TestCloudinary from './pages/TestCloudinary';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GetSingleShop from "./pages/SingleShop";
import AboutUs from './pages/AboutUs';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AddShop from './pages/AddShop';
import MyShop from './pages/MyShop';
//import GetOrderHistory from "./pages/GetOrderHistory";

import './index.css'

// import Hero from "components/hero/BackgroundAsImage.js";
// import Features from "components/features/DashedBorderSixFeatures";
// import Portfolio from "components/cards/PortfolioTwoCardsWithImage.js";
// import ContactUsForm from "components/forms/SimpleContactUs.js";
// import Footer from "components/footers/MiniCenteredFooter.js";
// import MainLandingPage from "./MainLandingPage";

/* Inner Pages */
// import LoginPage from "pages/Login.js";
// import SignupPage from "pages/Signup.js";
// import ContactUsPage from "pages/ContactUs.js";


const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/testCloudinary" component={TestCloudinary} />
          <Route exact path="/create-shop" component={AddShop} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/terms-of-service" component={TermsOfService} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/about-us" component={AboutUs} />
          <Route exact path="/shop/:id?" component={GetSingleShop} />
          <Route exact path="/my-shop/" component={MyShop} />

          <Route path="/components/:type/:subtype/:name">
            <ComponentRenderer />
          </Route>
          <Route path="/components/:type/:name">
            <ComponentRenderer />
          </Route>

        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
