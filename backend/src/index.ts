
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from '../src/graphql/resolvers';
import sessiondef from '../src/graphql/typeDefinitions/session';
import trackdef from '../src/graphql/typeDefinitions/track';
import userdef from '../src/graphql/typeDefinitions/user';
import typeparsers from '../src/utils/typeparsers';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

/*
import jsonwebtoken from 'jsonwebtoken';
import { getSessionEnvs } from './utils/envFunctions';
import user from './services/user';
import { decodedTokenType } from './types/sessionTypes';

import { PossibleFragmentSpreadsRule } from 'graphql';
*/
import session  from 'express-session';

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

  console.log(dbUrl);

};


const server = new ApolloServer({
  typeDefs: [
    sessiondef.sessionMutation,
    sessiondef.sessionQuery,
    trackdef.trackMutation,
    trackdef.trackQuery,
    userdef.userMutation,
    userdef.userQuery
  ],
  resolvers
  ,
 /* context: async ({ req }) => {
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
  } ,*/

  context:  ( {req}  ) => {   return {req}; },

/*
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
  */
  

});


const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true 
};
app.use(cors(corsOptions));


app.use(express.static('build'));

// Test

app.use(session({
  secret: 'dfdsfs',
  resave: false,
  saveUninitialized: false
}));

server.applyMiddleware({ app, cors: false });

  const port = typeparsers.parseNumber(process.env.PORT, 'Enviroment variable: variable was not a number');

void connectToDatabase();



app.listen({ port: port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);



