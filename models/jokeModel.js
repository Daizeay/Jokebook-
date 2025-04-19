const sqlite3 = require('sqlite3').verbose();

// 🔌 Connect to the SQLite database
const db = new sqlite3.Database('./database/jokebook.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("❌ Failed to open database:", err.message);
  } else {
    console.log("✅ Connected to jokebook.db");
  }
});

module.exports = {
  // 📋 Get all categories
  getCategories(callback) {
    console.log("🔍 Fetching categories from DB...");
    db.all("SELECT name FROM categories", [], (err, rows) => {
      if (err) {
        console.error("❌ DB error:", err.message);
      } else {
        console.log("✅ Categories fetched:", rows);
      }
      callback(err, rows);
    });
  },

  // 📂 Get jokes by category
  getJokesByCategory(category, limit, callback) {
    const sql = `
      SELECT jokes.setup, jokes.delivery FROM jokes
      JOIN categories ON jokes.category_id = categories.id
      WHERE categories.name = ? ${limit ? 'LIMIT ?' : ''}
    `;
    const params = limit ? [category, limit] : [category];
    db.all(sql, params, callback);
  },

  // 🎲 Get one random joke
  getRandomJoke(callback) {
    const sql = `
      SELECT setup, delivery FROM jokes ORDER BY RANDOM() LIMIT 1
    `;
    db.get(sql, [], callback);
  },

  // ➕ Add a new joke
  addJoke(category, setup, delivery, callback) {
    db.get("SELECT id FROM categories WHERE name = ?", [category], (err, row) => {
      if (err || !row) return callback({ error: "Invalid category" });

      db.run("INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)",
        [row.id, setup, delivery], function(err) {
          if (err) return callback(err);
          module.exports.getJokesByCategory(category, null, callback);
        });
    });
  }
};
