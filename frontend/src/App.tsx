import React from 'react';
import queries from './graphql/queries';
import { useLazyQuery } from '@apollo/client'
import Search from './components/search';
import { MessageType } from './type';
import {  Container, Row } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { showMessage } from './thunks/message';
import Message from './components/message';

const App: React.FC = () => {


  const [getTracks, { loading, error, data }] = useLazyQuery(queries.search, { fetchPolicy: "network-only", errorPolicy: 'all' })
  
  const dispatch = useDispatch()
  const selector = (state: MessageType) => state
  const rootstate = useSelector(selector)

  if(error && error.message !== rootstate.message.text ) {
    
    dispatch(showMessage(error.message,5000))
  }

  return (
    <div>
      <Container className="search">
        <Row>
          <div className="col-xs-2">
            <Message text={rootstate.message.text}/>
            <Search searchAction={getTracks} searchResult={data} />
          </div>
        </Row>
        
      </Container>
     
    </div>
  );
}

export default App;
