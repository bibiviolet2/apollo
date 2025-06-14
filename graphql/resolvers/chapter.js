import db from "../../db/connection.js";

const chapterResolvers = {
  Query: {
    chapters: async (_, { book }) => {
      const [rows] = await db.query(
        "SELECT * FROM chapter WHERE book = ? ORDER BY `order` ASC",
        [book]
      );
      return { results: rows || [] };
    },
    chapter: async (_, { slug }) => {
      const [rows] = await db.query("SELECT * FROM chapter WHERE slug = ?", [
        slug,
      ]);
      return { results: rows || [] };
    },
  },

  Mutation: {
    createChapter: async (
      _,
      { slug, name, order, book, content, lang = "cs" }
    ) => {
      console.log("➡️  Spouštím createChapter s:", {
        slug,
        name,
        order,
        book,
        content,
        lang,
      });

      try {
        const createdAt = new Date();
        const query = `
        INSERT INTO chapter (slug, name, \`order\`, book, content, lang, cratedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
        const values = [
          slug,
          name,
          order,
          book,
          content || "",
          lang,
          createdAt,
        ];

        await db.query(query, values);

        const [rows] = await db.query("SELECT * FROM chapter WHERE slug = ?", [
          slug,
        ]);
        return { results: rows || [] };
      } catch (error) {
        console.error("CHYBA V createChapter:", error);
        throw new Error(
          "Nepodařilo se vytvořit kapitolu. Slug už možná existuje."
        );
      }
    },

    updateChapter: async (_, { slug, name, order, content, lang }) => {
      const updates = [];
      const values = [];

      if (name !== undefined) {
        updates.push("name = ?");
        values.push(name);
      }
      if (order !== undefined) {
        updates.push("`order` = ?");
        values.push(order);
      }
      if (content !== undefined) {
        updates.push("content = ?");
        values.push(content);
      }
      if (lang !== undefined) {
        updates.push("lang = ?");
        values.push(lang);
      }

      if (updates.length === 0) {
        throw new Error("Musíš zadat alespoň jednu hodnotu k aktualizaci.");
      }

      const query = `
        UPDATE chapter
        SET ${updates.join(", ")}
        WHERE slug = ?
      `;
      values.push(slug);

      await db.query(query, values);

      const [rows] = await db.query("SELECT * FROM chapter WHERE slug = ?", [
        slug,
      ]);
      return { results: rows };
    },

    deleteChapter: async (_, { slug }) => {
      const [rows] = await db.query("SELECT * FROM chapter WHERE slug = ?", [
        slug,
      ]);

      if (rows.length === 0) {
        return { results: [] };
      }

      await db.query("DELETE FROM chapter WHERE slug = ?", [slug]);

      return { results: rows || [] };
    },
  },
};

export default chapterResolvers;
