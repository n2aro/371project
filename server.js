const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Dummy user data
const users = {
  "aisha_cooks@example.com": bcrypt.hashSync("1234", 10),
  "danalx@example.com": bcrypt.hashSync("1234", 10),
};

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (HTML, CSS, JS)

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Log the users object for debugging
  console.log('Current users:', users);

  if (users[username] && bcrypt.compareSync(password, users[username])) {
    res.status(200).send({ message: 'Login successful!' });
  } else {
    res.status(401).send({ message: 'Invalid username or password.' });
  }
});

// Create Account Endpoint
app.post('/create-account', (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (users[username]) {
    return res.status(400).send({ message: 'User already exists.' });
  }

  // Add the new user to the dummy users object
  users[username] = bcrypt.hashSync(password, 10);

  // Log the updated users object for debugging
  console.log('Updated users:', users);

  // Send success response
  res.status(201).send({ message: 'Account created successfully!' });
});