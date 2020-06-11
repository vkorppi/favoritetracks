
import { ApolloServer } from 'apollo-server';
import  { resolvers }  from '../src/graphql/resolvers';
import  { typeDefs }  from '../src/graphql/typedefinitions';
import typeparsers from '../src/utils/typeparsers';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {origin: typeparsers.parseEnvString(process.env.FRONTEND)}
  });
  
void  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
  