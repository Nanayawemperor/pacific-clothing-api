const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // your JWT login handler

// Register route
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login route using your JWT login controller
router.post('/login', authController.login);

module.exports = router;
