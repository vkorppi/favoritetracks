import React from 'react';
import Search from './components/spotify/search';
import { MessageType, UseId } from './type';
import { Container, Row, Navbar, Nav, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from './thunks/message';
import Message from './components/spotify/message';
import Registaration from './components/users/registaration';
import UserSearch from './components/users/userSearch';
import Details from './components/users/userDetails';
import Login from './components/users/login';
import { useRouteMatch, Route, Switch, useLocation } from 'react-router-dom';
import Favorites from './components/spotify/favorites';


const App: React.FC = () => {

  const dispatch = useDispatch()
  const selector = (state: MessageType) => state
  const rootstate = useSelector(selector)
  let location = useLocation();

  const showAlert = (message: string, type: string) => {

    dispatch(showMessage(message, 5000, type))
  };

  const logout = () => {

    localStorage.clear()

  };

  const noAlert = /details|registaration/i;

  const matchRoute = useRouteMatch("/details/:id")


  let id = ''

  if (matchRoute) {

    const param = matchRoute.params as UseId;
    id = param.id

  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Tracks</Nav.Link>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
            <Nav.Link href="#Published">Published</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="#Roles">Roles</Nav.Link>
            <Nav.Link href="/registaration">Registaration</Nav.Link>
            <Nav.Link href="/reset">reset password</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="#" onClick={() => logout()}>logout</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
      <Container className="search">

        {!noAlert.test(location.pathname) ?
          <Row>
            <div className="col-xs-2">

              <Message text={rootstate.message.text} msgtype={rootstate.message.msgtype} />

            </div>
          </Row>
          : ''}

        <Row>
          <div className="col-xs-2">

            <Switch>
            <Route path="/favorites">
                <Favorites showmessage={showAlert} />
              </Route>
              <Route path="/login">
                <Login showmessage={showAlert} />
              </Route>
              <Route path="/details">
                <Modal centered show={true}>
                  <Modal.Body>
                    <Details showmessage={showAlert} id={id} />
                  </Modal.Body>
                </Modal>
              </Route>
              <Route path="/users">
                <UserSearch showmessage={showAlert} />
              </Route>
              <Route path="/registaration">
                <Modal centered show={true}>
                  <Modal.Body>
                    <Message text={rootstate.message.text} msgtype={rootstate.message.msgtype} />
                    <Registaration showmessage={showAlert} />
                  </Modal.Body>
                </Modal>
              </Route>
              <Route path="/">
                <Search showmessage={showAlert} />
              </Route>
            </Switch>

          </div>
        </Row>

      </Container>

    </div>
  );
}

export default App;
