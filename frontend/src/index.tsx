import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom"
import { setContext } from 'apollo-link-context'



const authentication = setContext((_, { headers }) => {

  const token = localStorage.getItem('Token')

  const authorization = token && token !== 'null' ? `bearer ${token}` : null

  return { headers: { ...headers, authorization, } }
}
)


const httpLink  = new HttpLink({ uri: 'http://localhost:4000/graphql' }) 

const apollo = new ApolloClient({

  cache: new InMemoryCache(),
  link: authentication.concat(httpLink as any) as any 
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

