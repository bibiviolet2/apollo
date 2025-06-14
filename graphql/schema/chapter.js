import { gql } from "apollo-server";

const chapterSchema = gql`
  type Chapter {
    slug: String!
    name: String!
    order: Int!
    content: String!
    book: String!
    lang: String
  }

  type ChapterResults {
    results: [Chapter!]!
  }

  extend type Query {
    chapters(book: String!): ChapterResults!
    chapter(slug: String!): ChapterResults!
  }

  extend type Mutation {
    createChapter(
      slug: String!
      name: String!
      order: Float!
      book: String!
      content: String
      lang: String
    ): ChapterResults

    updateChapter(
      slug: String!
      name: String
      order: Float
      content: String
      lang: String
    ): ChapterResults

    deleteChapter(slug: String!): ChapterResults
  }
`;

export default chapterSchema;
