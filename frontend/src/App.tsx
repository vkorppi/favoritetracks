import React from 'react';
import queries from './graphql/queries';
import { useLazyQuery  } from '@apollo/client'

const App: React.FC = () => {

  const [getTracks, tracks] = useLazyQuery(queries.search, { fetchPolicy: "network-only" }) 


  return (
    <div>
    </div>
  );
}

export default App;
