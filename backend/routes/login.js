const express = require('express');
const router = express.Router();

// POST request for login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate the username and password
  if (username === 'test' && password === 'test') {
    // Authentication successful
    res.status(200).json({ success: true, message: 'Login successful' });
  } else {
    // Authentication failed
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

module.exports = router;