import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/schema/index.js';
import resolvers from './graphql/resolvers/index.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: ['*'], // 🔸 Doplněno podle potřeby
    credentials: true, // Použij, pokud potřebuješ cookies
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
