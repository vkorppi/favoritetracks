import React from 'react';
import Search from './components/spotify/search';
import { MessageType } from './type';
import { Container, Row, Navbar, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from './thunks/message';
import Message from './components/spotify/message';
import Registaration from './components/users/registaration';
import UserSearch from './components/users/userSearch';
import { Switch, Route } from 'react-router-dom';

const App: React.FC = () => {

  const dispatch = useDispatch()
  const selector = (state: MessageType) => state
  const rootstate = useSelector(selector)

  const errorMessage = (errorMsg: string) => {

    dispatch(showMessage(errorMsg, 5000, 'warning'))
  };


  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Tracks</Nav.Link>
            <Nav.Link href="#Favorites">Favorites</Nav.Link>
            <Nav.Link href="#Published">Published</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="#Roles">Roles</Nav.Link>
            <Nav.Link href="/registaration">Registaration</Nav.Link>
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

            <Switch>
              <Route path="/users">
                <UserSearch showmessage={errorMessage} />
              </Route>
              <Route path="/registaration">
                <Registaration showmessage={errorMessage} />
              </Route>
              <Route path="/">
                <Search showmessage={errorMessage} />
              </Route>
            </Switch>

          </div>
        </Row>

      </Container>

    </div>
  );
}

export default App;
