const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /register - user registration
router.post('/register', authController.register);

// POST /login - user login
router.post('/login', authController.login);

// GET /google - initiate Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /google/callback - handle Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),
  (req, res) => {
    // Successful authentication, redirect to dashboard or desired page
    res.redirect('/dashboard');
  }
);

module.exports = router;
