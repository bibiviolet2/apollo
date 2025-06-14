import { gql } from "apollo-server";

const glossarySchema = gql`
  type GlossaryEntry {
    id: ID!
    base_word: String!
    variants: [String!]!
    explanation: String!
    visible: Boolean!
    createdAt: String!
  }

  type GlossaryResults {
    results: [GlossaryEntry!]!
  }

  extend type Query {
    glossary: GlossaryResults!
    glossaryEntry(base_word: String!): GlossaryResults!
  }

  extend type Mutation {
    createGlossaryEntry(
      base_word: String!
      variants: [String!]!
      explanation: String!
      visible: Boolean
    ): GlossaryResults!

    updateGlossaryEntry(
      base_word: String!
      variants: [String!]
      explanation: String
      visible: Boolean
    ): GlossaryResults!

    deleteGlossaryEntry(base_word: String!): GlossaryResults!
  }
`;

export default glossarySchema;
