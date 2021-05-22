import './styles/globalStyles.css';
// import "./tailwindcss/dist/base.css";
import React from "react";
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import ComponentRenderer from "./ComponentRenderer";

import Home from './pages/Home';
import Nav from './components/Nav';
import TestCloudinary from './pages/TestCloudinary';
import Login from './pages/Login';

// import Hero from "components/hero/BackgroundAsImage.js";
// import Features from "components/features/DashedBorderSixFeatures";
// import Portfolio from "components/cards/PortfolioTwoCardsWithImage.js";
// import ContactUsForm from "components/forms/SimpleContactUs.js";
// import Footer from "components/footers/MiniCenteredFooter.js";
import MainLandingPage from "./MainLandingPage";

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
          <Route exact path="/login" component={Login} />
          <Route path="/components/:type/:subtype/:name">
            <ComponentRenderer />
          </Route>
          <Route path="/components/:type/:name">
            <ComponentRenderer />
          </Route>
          <Route path="/">
            <MainLandingPage />
          </Route>
        </Switch>

      </Router>
    </ApolloProvider>
  );
}

export default App;
