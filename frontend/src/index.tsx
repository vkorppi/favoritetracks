import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom"

let graphqlPath ='';


if (process.env.REACT_APP_ENVIR === 'test') {
  graphqlPath=process.env.REACT_APP_GRAPHQL_DEV as string;
}
else {
  graphqlPath=process.env.REACT_APP_GRAPHQL_PROD as string;
}

const httpLink  = new HttpLink({ uri: graphqlPath,credentials: 'include' }) 

const apollo = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink 
})


ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={apollo}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

