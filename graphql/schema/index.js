import bookSchema from './book.js';
import chapterSchema from './chapter.js';

const typeDefs = [
  `
  type Query
  `,
  bookSchema,
  chapterSchema,
];

export default typeDefs;
