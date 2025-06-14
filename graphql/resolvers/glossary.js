import db from "../../db/connection.js";

const glossaryResolvers = {
  Query: {
    glossary: async () => {
      const [rows] = await db.query(
        "SELECT * FROM glossary ORDER BY base_word ASC"
      );
      rows.forEach((r) => (r.variants = JSON.parse(r.variants)));
      return { results: rows };
    },

    glossaryEntry: async (_, { base_word }) => {
      const [rows] = await db.query(
        "SELECT * FROM glossary WHERE base_word = ?",
        [base_word]
      );
      rows.forEach((r) => (r.variants = JSON.parse(r.variants)));
      return { results: rows };
    },
  },

  Mutation: {
    createGlossaryEntry: async (
      _,
      { base_word, variants, explanation, visible = true }
    ) => {
      const variantsJSON = JSON.stringify(variants);
      await db.query(
        `INSERT INTO glossary (base_word, variants, explanation, visible) VALUES (?, ?, ?, ?)`,
        [base_word, variantsJSON, explanation, visible]
      );
      const [rows] = await db.query(
        "SELECT * FROM glossary WHERE base_word = ?",
        [base_word]
      );
      rows.forEach((r) => (r.variants = JSON.parse(r.variants)));
      return { results: rows };
    },

    updateGlossaryEntry: async (
      _,
      { base_word, variants, explanation, visible }
    ) => {
      const updates = [];
      const values = [];

      if (variants !== undefined) {
        updates.push("variants = ?");
        values.push(JSON.stringify(variants));
      }
      if (explanation !== undefined) {
        updates.push("explanation = ?");
        values.push(explanation);
      }
      if (visible !== undefined) {
        updates.push("visible = ?");
        values.push(visible);
      }

      if (updates.length === 0) {
        throw new Error("Musíš zadat alespoň jednu hodnotu k aktualizaci.");
      }

      const query = `UPDATE glossary SET ${updates.join(
        ", "
      )} WHERE base_word = ?`;
      values.push(base_word);
      await db.query(query, values);

      const [rows] = await db.query(
        "SELECT * FROM glossary WHERE base_word = ?",
        [base_word]
      );
      rows.forEach((r) => (r.variants = JSON.parse(r.variants)));
      return { results: rows };
    },

    deleteGlossaryEntry: async (_, { base_word }) => {
      const [rows] = await db.query(
        "SELECT * FROM glossary WHERE base_word = ?",
        [base_word]
      );
      if (rows.length === 0) return { results: [] };

      await db.query("DELETE FROM glossary WHERE base_word = ?", [base_word]);
      rows.forEach((r) => (r.variants = JSON.parse(r.variants)));
      return { results: rows };
    },
  },
};

export default glossaryResolvers;
