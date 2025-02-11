import bookResolvers from "./book.js";
import chapterResolvers from "./chapter.js";

// Kombinace všech resolverů
const resolvers = {
  Query: {
    ...bookResolvers.Query,
	...chapterResolvers.Query,
  },
};

export default resolvers;