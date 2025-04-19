const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./database/jokebook.db', (err) => {
  if (err) return console.error(" DB Connection Error:", err.message);
  console.log(" Connected to new jokebook.db");
});

const initSql = fs.readFileSync('./database/init.sql', 'utf8');

db.exec(initSql, (err) => {
  if (err) {
    console.error(" Error executing init.sql:", err.message);
  } else {
    console.log("🎉 jokebook.db created and initialized!");
  }
  db.close();
});
