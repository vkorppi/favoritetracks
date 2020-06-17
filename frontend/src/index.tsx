import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const apollo = new ApolloClient({

  cache: new InMemoryCache(),
  link: httpLink
})

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={apollo}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

