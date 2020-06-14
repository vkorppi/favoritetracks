
import { ApolloServer } from 'apollo-server-express';
import  { resolvers }  from '../src/graphql/resolvers';
import  { typeDefs }  from '../src/graphql/typeDefinitions';
import  typeparsers  from '../src/utils/typeparsers';

import express from 'express';


const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {  
      
      const internalError = /Enviroment variable|Expiration time|Token|Spotify/i;
      const userError= /|Track|Page/i;

      console.log(err.message);
     
      if (internalError.test(err.message)) { 

          return new Error('Internal server error');
      }
      else if (userError.test(err.message)) {
        return new Error(err.message);
      }
 
      return err;
  }

  });
  
const app = express();

 app.use(express.static('TestPage'));

server.applyMiddleware({ app });

const port =typeparsers.parseEnvNumber(process.env.PORT)

app.listen({ port: port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);



