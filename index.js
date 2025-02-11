import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/schema/index.js';
import resolvers from './graphql/resolvers/index.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
