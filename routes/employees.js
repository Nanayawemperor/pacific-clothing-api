const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const mongoose = require('mongoose');

// Middleware to validate ObjectId for routes with :id param
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid employee ID' });
  }
  next();
};

// Public route - get all employees
router.get('/', controller.getAll);

// Protected routes - require authentication
router.post('/', ensureAuthenticated, controller.create);
router.put('/:id', ensureAuthenticated, validateObjectId, controller.update);

// Admin-only route for deletion
router.delete('/:id', ensureAdmin, validateObjectId, controller.remove);

module.exports = router;
