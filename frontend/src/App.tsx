import React from 'react';
import queries from './graphql/queries';
import { useLazyQuery } from '@apollo/client'
import Search from './components/search';

import { Alert, Container, Row } from 'react-bootstrap'



const App: React.FC = () => {


  const [getTracks, { loading, error, data }] = useLazyQuery(queries.search, { fetchPolicy: "network-only", errorPolicy: 'all' })

  return (
    <div>
      <Container className="search">
        <Row>
          <div className="col-xs-2">
            {error ? <Alert variant="danger"> {error.message} </Alert> : ''}
            <Search searchAction={getTracks} searchResult={data} />
          </div>
        </Row>
        
      </Container>
     
    </div>
  );
}

export default App;
