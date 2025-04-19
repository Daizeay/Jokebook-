const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const jokeRoutes = require('./routes/jokeRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from /public (for app.js, style.css, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/jokebook', jokeRoutes);

// Serve index.html on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running at http://localhost:${PORT}`));
