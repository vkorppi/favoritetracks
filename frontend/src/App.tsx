import React from 'react';
import queries from './graphql/queries';
import { useLazyQuery } from '@apollo/client'
import Search from './components/spotify/search';
import { MessageType } from './type';
import { Container, Row, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from './thunks/message';
import Message from './components/spotify/message';
import Registaration from './components/users/registaration';

const App: React.FC = () => {


  const [getTracks, { loading, error, data }] = useLazyQuery(queries.search, { fetchPolicy: "network-only", errorPolicy: 'all' })

  const dispatch = useDispatch()
  const selector = (state: MessageType) => state
  const rootstate = useSelector(selector)

  if (error && error.message !== rootstate.message.text) {

    dispatch(showMessage(error.message, 5000))
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#Registaration">Tracks</Nav.Link>
            <Nav.Link href="#Favorites">Favorites</Nav.Link>
            <Nav.Link href="#Published">Published</Nav.Link>
            <Nav.Link href="#Users">Users</Nav.Link>
            <Nav.Link href="#Registaration">Registaration</Nav.Link>
            <Nav.Link href="#Login">Login</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
      <Container className="search">
        <Row>
          <div className="col-xs-2">

            <Registaration name=''/>

          {/*  <Message text={rootstate.message.text} />
            <Search searchAction={getTracks} searchResult={data} /> */}
            
          </div>
        </Row>

      </Container>

    </div>
  );
}

export default App;
