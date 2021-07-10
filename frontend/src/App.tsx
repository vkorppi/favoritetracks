import React from 'react';
import Search from './components/spotify/search';
import { MessageType } from './types/alerts';
import { UserId, Auhtorization } from './types/user';
import { Container, Row, Navbar, Nav, Modal } from 'react-bootstrap'
import { showMessage } from './thunks/message';
import Message from './components/spotify/message';
import Registaration from './components/users/registaration';
import UserSearch from './components/users/userSearch';
import Details from './components/users/userDetails';
import Login from './components/users/login';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';
import Favorites from './components/spotify/favorites';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from "react-router-bootstrap";
import usermq from './graphql/user';
import sessionmq from './graphql/session';
import { useQuery, useMutation } from '@apollo/client';


const App: React.FC = () => {

  const dispatch = useDispatch()
  let hasAuthenticated = false
  let isAdmin = false

  const [logOut] = useMutation(sessionmq.logout, {
    errorPolicy: 'none', onError: (error) => {
      console.log(error.message)
    }
  })

  const getauthorization = useQuery(usermq.getAuthorization, {
    fetchPolicy: "no-cache", errorPolicy: 'none',
  })

  const history = useHistory()

  let permission


  if (getauthorization && getauthorization.data) {

    permission = getauthorization.data.getAuthorization as Auhtorization

  }

  if (permission) {

    hasAuthenticated = permission.authenticated
    isAdmin = permission.admin


  }

  const selector = (state: MessageType) => state
  const rootstate = useSelector(selector)

  const showAlert = (message: string, type: string) => {

    dispatch(showMessage(message, 5000, type))
  };

  const logout = async () => {

    await logOut()

    await getauthorization.refetch()

    history.push("/")

  };

  const matchRoute = useRouteMatch("/details/:id")

  let id = ''

  if (matchRoute) {

    const param = matchRoute.params as UserId;
    id = param.id

  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/"><Nav.Link>Tracks</Nav.Link></LinkContainer>
            {hasAuthenticated ? <LinkContainer to="/favorites"><Nav.Link>Favorites</Nav.Link></LinkContainer> : ''}
            {hasAuthenticated ? <LinkContainer to="/users"><Nav.Link>Users</Nav.Link></LinkContainer> : ''}
            {isAdmin ? <LinkContainer to="/registaration"><Nav.Link>Registaration</Nav.Link></LinkContainer> : ''}
            {hasAuthenticated ? <LinkContainer to="/details"><Nav.Link>Me</Nav.Link></LinkContainer> : ''}
            {!hasAuthenticated ? <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer> : ''}
            {hasAuthenticated ? <Nav.Link href="#" onClick={() => logout()}>logout</Nav.Link> : ''}
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
              {hasAuthenticated ?
                <Route path="/favorites">
                  <Favorites showmessage={showAlert} />
                </Route>
                : ''}
              {!hasAuthenticated ?
                <Route path="/login">
                  <Login showmessage={showAlert} refetch={getauthorization.refetch} />
                </Route>
                : ''}
              {hasAuthenticated ?
                <Route path="/details">
                  <Modal centered show={true}>
                    <Modal.Body>
                      <Details showmessage={showAlert} id={id} />
                    </Modal.Body>
                  </Modal>
                </Route>
                : ''}
              {hasAuthenticated ?
                <Route path="/users">
                  <UserSearch showmessage={showAlert} />
                </Route>
                : ''}
              {isAdmin ?
                <Route path="/registaration">
                  <Modal centered show={true}>
                    <Modal.Body>
                      <Message text={rootstate.message.text} msgtype={rootstate.message.msgtype} />
                      <Registaration showmessage={showAlert} />
                    </Modal.Body>
                  </Modal>
                </Route>
                : ''}
              <Route path="/">
                <Search showmessage={showAlert} authorization={hasAuthenticated}/>
              </Route>
            </Switch>
          </div>
        </Row>
      </Container>

    </div>
  );
}

export default App;
