const express = require('express');
const router = express.Router();
const controller = require('../controllers/departmentController');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');

// Public route: get all departments
router.get('/', controller.getAll);

// Protected routes - require authentication
router.post('/', ensureAuthenticated, controller.create);
router.put('/:id', ensureAuthenticated, controller.update);

// Admin-only route for deletion
router.delete('/:id', ensureAdmin, controller.remove);

module.exports = router;
