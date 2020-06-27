
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from '../src/graphql/resolvers';
import { typeDefs } from '../src/graphql/typeDefinitions';
import typeparsers from '../src/utils/typeparsers';
import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const connectToDatabase = async (): Promise<void> => {

  let dbUrl:string|undefined;
 
  if (process.env.ENVIR === 'test') {
    dbUrl=process.env.DBTEST;
  }
  else {
    dbUrl=process.env.DATABASE;
  }

  const envError = 'database url was not a string';
  const parsedUrl = typeparsers.parseString(dbUrl, envError);

  const configuration = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  };

  await mongoose.connect(parsedUrl, configuration);

};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {

    const internalError = /Enviroment variable|Expiration time|Token|Spotify/i;
    const userError = /|Track|Page|Password|Username|Search|firstname|lastname/i;

    console.log(err.message);

    if (err instanceof MongoError ) {
      return new Error('Internal server error');
    }

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

const port = typeparsers.parseNumber(process.env.PORT, 'Enviroment variable: variable was not a number');

void connectToDatabase();



app.listen({ port: port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);



