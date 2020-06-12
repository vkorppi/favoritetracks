
import { ApolloServer } from 'apollo-server';
import  { resolvers }  from '../src/graphql/resolvers';
import  { typeDefs }  from '../src/graphql/typeDefinitions';
import typeparsers from '../src/utils/typeparsers';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {  
      
      const pattern = /Enviroment variable|Expiration time|Token|Spotify|Track|Page/i;
     
      if (pattern.test(err.message)) { 
             return new Error('Internal server error');
      }
      return err;
  },
    cors: {origin: typeparsers.parseEnvString(process.env.FRONTEND)}
  });
  
void  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
  




