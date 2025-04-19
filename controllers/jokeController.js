const jokeModel = require('../models/jokeModel');
const axios = require('axios'); // Make sure to run: npm install axios

exports.getCategories = (req, res) => {
  jokeModel.getCategories((err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows.map(r => r.name));
  });
};

exports.getJokesByCategory = (req, res) => {
  const { category } = req.params;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;

  jokeModel.getJokesByCategory(category, limit, async (err, rows) => {
    if (!err && rows.length > 0) {
      return res.json(rows); //  Category exists in DB
    }

    //  Extra credit: Try fetching from JokeAPI if category not found
    try {
      const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}?type=twopart&amount=3&safe-mode`);
      const newJokes = response.data.jokes;

      if (!newJokes || newJokes.length === 0) {
        return res.status(404).json({ error: `No jokes found for category "${category}"` });
      }

      // Add new category and jokes to DB
      jokeModel.addCategoryIfNotExists(category, () => {
        let insertedCount = 0;

        newJokes.forEach(j => {
          jokeModel.addJoke(category, j.setup, j.delivery, () => {
            insertedCount++;
            if (insertedCount === newJokes.length) {
              // After all jokes are inserted, return updated category
              jokeModel.getJokesByCategory(category, limit, (finalErr, finalRows) => {
                if (finalErr || !finalRows) return res.status(500).json({ error: "Failed to fetch new jokes." });
                res.json(finalRows);
              });
            }
          });
        });
      });
    } catch (apiError) {
      return res.status(404).json({ error: `Invalid category or no jokes available externally.` });
    }
  });
};

exports.getRandomJoke = (req, res) => {
  jokeModel.getRandomJoke((err, row) => {
    if (err) return res.status(500).json(err);
    res.json(row);
  });
};

exports.addJoke = (req, res) => {
  const { category, setup, delivery } = req.body;
  if (!category || !setup || !delivery) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  jokeModel.addCategoryIfNotExists(category, () => {
    jokeModel.addJoke(category, setup, delivery, (err, rows) => {
      if (err) return res.status(400).json(err);
      res.json(rows);
    });
  });
};
