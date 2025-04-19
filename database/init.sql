DROP TABLE IF EXISTS jokes;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE jokes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  setup TEXT NOT NULL,
  delivery TEXT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert default categories
INSERT OR IGNORE INTO categories (name) VALUES ('funnyJoke'), ('lameJoke');

-- funnyJoke entries
INSERT INTO jokes (category_id, setup, delivery)
SELECT id, 'Why did the student eat his homework?', 'Because the teacher told him it was a piece of cake!' FROM categories WHERE name = 'funnyJoke';

INSERT INTO jokes (category_id, setup, delivery)
SELECT id, 'What kind of tree fits in your hand?', 'A palm tree' FROM categories WHERE name = 'funnyJoke';

INSERT INTO jokes (category_id, setup, delivery)
SELECT id, 'What is worse than raining cats and dogs?', 'Hailing taxis' FROM categories WHERE name = 'funnyJoke';

-- lameJoke entries
INSERT INTO jokes (category_id, setup, delivery)
SELECT id, 'Which bear is the most condescending?', 'Pan-DUH' FROM categories WHERE name = 'lameJoke';

INSERT INTO jokes (category_id, setup, delivery)
SELECT id, 'What would the Terminator be called in his retirement?', 'The Exterminator' FROM categories WHERE name = 'lameJoke';
