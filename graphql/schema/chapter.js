import { gql } from 'apollo-server';

const chapterSchema = gql`
  type Chapter {
	slug: String!
	name: String!
	order: Int!
	content: String!
  }

  type ChapterResults {
	results: [Chapter!]!
  }

  extend type Query {
	chapters(book: String!): ChapterResults!
	chapter(slug: String!): ChapterResults!
  }
`;

export default chapterSchema;
