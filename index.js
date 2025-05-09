import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/schema/index.js';
import resolvers from './graphql/resolvers/index.js';

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // pro non-browser požadavky

    const allowedOrigins = [
      'https://studio.apollographql.com',
      'http://localhost:3000',
      'https://sakuraonline.cz',
      'http://sakura-8023.rostiapp.cz'
    ];

    const is192 = /^http:\/\/192\.168\.88\.\d{1,3}(:\d+)?$/.test(origin);

    if (allowedOrigins.includes(origin) || is192) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
server.applyMiddleware({ app, path: '/graphql', cors: false }); // cors false, protože už je nastaven přes express

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server běží na http://localhost:${PORT}/graphql`);
});
