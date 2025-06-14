import bookResolvers from "./book.js";
import chapterResolvers from "./chapter.js";
import glossaryResolvers from "./glossary.js";

const resolvers = {
  Query: {
    ...bookResolvers.Query,
    ...chapterResolvers.Query,
    ...glossaryResolvers.Query,
  },
  Mutation: {
    ...bookResolvers.Mutation,
    ...chapterResolvers.Mutation,
    ...glossaryResolvers.Mutation,
  },
};

export default resolvers;
