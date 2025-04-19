const express = require('express');
const router = express.Router();
const controller = require('../controllers/jokeController');

router.get('/categories', controller.getCategories);
router.get('/joke/:category', controller.getJokesByCategory);
router.get('/random', controller.getRandomJoke);
router.post('/joke/add', controller.addJoke);

module.exports = router; // This is critical
