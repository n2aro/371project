const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

// Dummy user data
const users = {
  "aisha_cooks@gmail.com": bcrypt.hashSync("1234", 10),
  "99952134": bcrypt.hashSync("1234", 10),
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

// Create Account endpoint
app.post('/create-account', (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    return res.status(400).send({ message: 'User already exists.' });
  }

  users[username] = bcrypt.hashSync(password, 10);
  res.status(201).send({ message: 'Account created successfully!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});