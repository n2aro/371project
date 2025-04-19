const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

// Dummy user data
const users = {
  "aisha_cooks@example.com": bcrypt.hashSync("password123", 10),
  "danalx@example.com": bcrypt.hashSync("1234", 10),
};

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (e.g., HTML, CSS, JS)

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username] && bcrypt.compareSync(password, users[username])) {
    res.status(200).send({ message: 'Login successful!' });
  } else {
    res.status(401).send({ message: 'Invalid username or password.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});