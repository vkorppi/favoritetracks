
import { ApolloServer } from 'apollo-server';
import  { resolvers }  from '../src/graphql/resolvers';
import  { typeDefs }  from '../src/graphql/typeDefinitions';
import typeparsers from '../src/utils/typeparsers';



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
  },
    cors: {origin: typeparsers.parseEnvString(process.env.FRONTEND)}
  });
  
void  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
  

