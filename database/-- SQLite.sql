-- SQLite
-- Create Categories Table
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

-- Create Jokes Table
CREATE TABLE jokes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  setup TEXT NOT NULL,
  delivery TEXT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert Categories
INSERT INTO categories (name) VALUES
  ('funnyJoke'),
  ('lameJoke');

-- Insert Jokes
INSERT INTO jokes (category_id, setup, delivery) VALUES
  (1, 'Why did the student eat his homework?', 'Because the teacher told him it was a piece of cake!'),
  (1, 'What kind of tree fits in your hand?', 'A palm tree'),
  (1, 'What is worse than raining cats and dogs?', 'Hailing taxis'),
  (2, 'Which bear is the most condescending?', 'Pan-DUH'),
  (2, 'What would the Terminator be called in his retirement?', 'The Exterminator');


