import { gql } from 'apollo-server';

const bookSchema = gql`
  type Book {
    slug: String!
    name: String!
  }

  type BookResults {
    results: [Book!]!
  }

  extend type Query {
    books: BookResults!
    book(slug: String!): BookResults!
  }
`;

export default bookSchema;
