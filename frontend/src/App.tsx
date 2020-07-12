import React from 'react';
import Search from './components/spotify/search';
import { MessageType, UseId } from './type';
import { Container, Row, Navbar, Nav, Modal } from 'react-bootstrap'
import { showMessage } from './thunks/message';
import Message from './components/spotify/message';
import Registaration from './components/users/registaration';
import UserSearch from './components/users/userSearch';
import Details from './components/users/userDetails';
import Login from './components/users/login';
import { useRouteMatch, Route, Switch, useLocation,Redirect,useHistory } from 'react-router-dom';
import Favorites from './components/spotify/favorites';
import { useDispatch, useSelector } from 'react-redux'


const App: React.FC = () => {

  const dispatch = useDispatch()
  
  const selector = (state: MessageType) => state
  const rootstate = useSelector(selector)

  const location = useLocation();
  const token = localStorage.getItem('Token')
  const admin =  localStorage.getItem('Admin') === 'true'
  const history = useHistory()

  const showAlert = (message: string, type: string) => {

    dispatch(showMessage(message, 5000, type))
  };

  const logout = () => {

    localStorage.clear()
    history.push("/")
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
            {token ? <Nav.Link href="/favorites">Favorites</Nav.Link> :  ''}  
            {token ? <Nav.Link href="/users">Users</Nav.Link> :  ''}  
            {token && admin  ?  <Nav.Link href="/registaration">Registaration</Nav.Link> :  ''}  
            {token ? <Nav.Link href="/details">Me</Nav.Link> :  ''} 
            {!token ? <Nav.Link href="/login">Login</Nav.Link> :  ''}  
            {token ? <Nav.Link href="#" onClick={() => logout()}>logout</Nav.Link> :  ''} 
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
            {token ? <Favorites showmessage={showAlert} /> :  <Redirect to="/login" />}  
              </Route>
              <Route path="/login">
                <Login showmessage={showAlert} />
              </Route>
              <Route path="/details">
              {token ?
              <Modal centered show={true}>
                  <Modal.Body>
                    <Details showmessage={showAlert} id={id} />
                  </Modal.Body>
                </Modal>
                 :  <Redirect to="/login" />}  
              </Route>
              <Route path="/users">
              {token ?
                <UserSearch showmessage={showAlert} />
                :  <Redirect to="/login" />}  
              </Route>
              <Route path="/registaration">
              {token    ?
                <Modal centered show={true}>
                  <Modal.Body>
                    <Message text={rootstate.message.text} msgtype={rootstate.message.msgtype} />
                    <Registaration showmessage={showAlert} />
                  </Modal.Body>
                </Modal>
                 :  <Redirect to="/login" />} 
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
