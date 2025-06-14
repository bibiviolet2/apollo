import bookSchema from "./book.js";
import chapterSchema from "./chapter.js";
import glossarySchema from "./glossary.js";

const typeDefs = [
  `
  type Query
  type Mutation
  `,
  bookSchema,
  chapterSchema,
  glossarySchema,
];

export default typeDefs;
