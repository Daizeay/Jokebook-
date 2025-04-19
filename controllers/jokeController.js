const jokeModel = require('../models/jokeModel');

exports.getCategories = (req, res) => {
  jokeModel.getCategories((err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows.map(r => r.name));
  });
};

exports.getJokesByCategory = (req, res) => {
  const { category } = req.params;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  jokeModel.getJokesByCategory(category, limit, (err, rows) => {
    if (err || rows.length === 0) return res.status(404).json({ error: "Category not found or no jokes" });
    res.json(rows);
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

  jokeModel.addJoke(category, setup, delivery, (err, rows) => {
    if (err) return res.status(400).json(err);
    res.json(rows);
  });
};
