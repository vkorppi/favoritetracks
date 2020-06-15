import React from 'react';
import queries from './graphql/queries';
import { useLazyQuery  } from '@apollo/client'
import Search from './components/search';





const App: React.FC = () => {
 

  const [getTracks, tracks] = useLazyQuery(queries.search, { fetchPolicy: "network-only" }) 


  return (
    <div>
      <Search searchAction={getTracks} searchResult={tracks}/>
    </div>
  );
}

export default App;
