
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from '../src/graphql/resolvers';
import { typeDefs } from '../src/graphql/typeDefinitions';
import typeparsers from '../src/utils/typeparsers';
import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import dotenv from 'dotenv';
import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { getSessionEnvs } from './utils/envFunctions';
import user from './services/user';
import { decodedTokenType } from './types';

dotenv.config();

const connectToDatabase = async (): Promise<void> => {

  let dbUrl: string | undefined;

  if (process.env.ENVIR === 'test') {
    dbUrl = process.env.DBTEST;
  }
  else {
    dbUrl = process.env.DATABASE;
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
  resolvers
  ,
  context: async ({ req }) => {
    if (req) {
      const { secret } = getSessionEnvs();
      const auth = req.headers.authorization;
      const hasAuthHeader = auth ? auth.startsWith('bearer ') : false;
      let encodedToken: string;

      if (hasAuthHeader) {
        encodedToken = auth?.replace('bearer ', '') as string;
        const decodedToken = jsonwebtoken.verify(encodedToken, secret) as decodedTokenType;

        const userdata =user.getUser(decodedToken.id);

        return userdata.then(
          response => {
            return response;
          }
        );

      }

    }

    return '';
  },

  formatError: (err) => {

    const userError = /userInput:.*|Unauthorized action/i;

    console.log(err.message);

    if (!userError.test(err.message)) {

      return new Error('Internal server error');
    }
    else {
      return new Error(err.message);
    }

    return err;
  }
  

});



const app = express();

app.use(express.static('TestPage'));


app.get('/login', function(_req, res) {
  res.sendFile(path.join('build', 'index.html'), { root: __dirname });
});

app.get('/favorites', function(_req, res) {
  res.sendFile(path.join('build', 'index.html'), { root: __dirname });
});

app.get('/details/*', function(_req, res) {
  res.sendFile(path.join('build', 'index.html'), { root: __dirname });
});

app.get('/details', function(_req, res) {
  res.sendFile(path.join('build', 'index.html'), { root: __dirname });
});

app.get('/users', function(_req, res) {
  res.sendFile(path.join('build', 'index.html'), { root: __dirname });
});

app.get('/registaration', function(_req, res) {
  res.sendFile(path.join('build', 'index.html'), { root: __dirname });
});

server.applyMiddleware({ app });

const port = typeparsers.parseNumber(process.env.PORT, 'Enviroment variable: variable was not a number');

void connectToDatabase();



app.listen({ port: port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);



