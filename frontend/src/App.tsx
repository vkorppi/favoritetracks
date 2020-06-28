import React from 'react';
import Search from './components/spotify/search';
import { MessageType, UserParamType } from './type';
import { Container, Row, Navbar, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from './thunks/message';
import Message from './components/spotify/message';
import Registaration from './components/users/registaration';
import UserSearch from './components/users/userSearch';
import Details from './components/users/userDetails';
import { useRouteMatch, Route, Switch } from 'react-router-dom';


const App: React.FC = () => {

  const dispatch = useDispatch()
  const selector = (state: MessageType) => state
  const rootstate = useSelector(selector)

  const showAlert = (message: string,type: string) => {

    dispatch(showMessage(message, 5000, type))
  };



  const matchRoute = useRouteMatch("/details/:id")

  let id = ''

  if (matchRoute) {

    const param = matchRoute.params as UserParamType;
    id = param.id

  }

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
            <Nav.Link href="/reset">reset password</Nav.Link>
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
              <Route path="/details">
                <Details showmessage={showAlert} id={id} />
              </Route>
              <Route path="/users">
                <UserSearch showmessage={showAlert} />
              </Route>
              <Route path="/registaration">
                <Registaration showmessage={showAlert} />
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
