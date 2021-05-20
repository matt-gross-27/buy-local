import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Home from './pages/Home';
import Nav from './components/Nav';
import TestCloudinary from './pages/TestCloudinary';


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
        </Switch>

      </Router>
    </ApolloProvider>
  );
}

export default App;
