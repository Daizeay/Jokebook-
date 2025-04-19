const express = require('express');
const bodyParser = require('body-parser');
const jokeRoutes = require('./routes/jokeRoutes'); // ✅ Check this path
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/jokebook', jokeRoutes); // ✅ This must be a function (router)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
