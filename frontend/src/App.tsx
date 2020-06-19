import React from 'react';
import queries from './graphql/queries';
import { useLazyQuery  } from '@apollo/client'
import Search from './components/search';





const App: React.FC = () => {
 

  const [getTracks, {loading, error, data}] = useLazyQuery(queries.search, { fetchPolicy: "network-only",errorPolicy: 'all' }) 


  return (
    <div>
      <div><h1>Error </h1> </div>
      <Search searchAction={getTracks} searchResult={data}/>
    </div>
  );
}

export default App;
