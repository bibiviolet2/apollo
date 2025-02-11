import db from '../../db/connection.js';

const bookResolvers = {
  Query: {
    books: async () => {
      const [rows] = await db.query('SELECT * FROM book');
      return { results: rows };
    },
    book: async (_, { slug }) => {
      const [rows] = await db.query('SELECT * FROM book WHERE slug = ?', [slug]);
      return { results: rows };
    },
  },
};

export default bookResolvers;
