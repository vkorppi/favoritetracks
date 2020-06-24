import React from 'react';
import queries from './graphql/queries';
import { useLazyQuery, useMutation, ApolloError, useApolloClient } from '@apollo/client'
import Search from './components/spotify/search';
import { MessageType } from './type';
import { Container, Row, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from './thunks/message';
import Message from './components/spotify/message';
//import Registaration from './components/users/registaration';
import UserSearch from './components/users/search';

const App: React.FC = () => {

  const dispatch = useDispatch()
  const selector = (state: MessageType) => state
  const rootstate = useSelector(selector)

  const errorMessage = (errorMsg: string) => {
    dispatch(showMessage(errorMsg, 5000,'warning'))
  };


  const [getTracks, trackObject] = useLazyQuery(queries.search, {
    fetchPolicy: "network-only", errorPolicy: 'none',
    onError: (error) => {
      errorMessage(error.message)
    }
  })

  const [createUser, createUserObject] = useMutation(queries.createUser, { errorPolicy: 'none', onError: (error) => {
    errorMessage(error.message)
  }})

  console.log(rootstate.message.msgtype)

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#Tracks">Tracks</Nav.Link>
            <Nav.Link href="#Favorites">Favorites</Nav.Link>
            <Nav.Link href="#Published">Published</Nav.Link>
            <Nav.Link href="#Users">Users</Nav.Link>
            <Nav.Link href="#Roles">Roles</Nav.Link>
            <Nav.Link href="#Registaration">Registaration</Nav.Link>
            <Nav.Link href="#Login">Login</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
      <Container className="search">
        <Row>
          <div className="col-xs-2">
         
            <Message text={rootstate.message.text} msgtype={rootstate.message.msgtype} />
 
          </div>
        </Row>

        <Row>
          <div className="col-xs-2">
            
            {/*
             <Search searchAction={getTracks} searchResult={trackObject.data} />
            <Registaration createuser={createUser} />
            */}

            <UserSearch createuser={createUser} />

          </div>
        </Row>

      </Container>

    </div>
  );
}

export default App;
