import db from '../../db/connection.js';

const chapterResolvers = {
  Query: {
    chapters: async (_, { book }) => {
		const [rows] = await db.query('SELECT * FROM chapter WHERE book = ? ORDER BY order ASC', [book]);
		return { results: rows };
	  },
    chapter: async (_, { slug }) => {
      const [rows] = await db.query('SELECT * FROM chapter WHERE slug = ?', [slug]);
      return { results: rows };
    },
  },
};

export default chapterResolvers;
