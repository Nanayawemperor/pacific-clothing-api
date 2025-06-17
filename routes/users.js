const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

// Apply authentication middleware to all routes in this router
router.use(ensureAuthenticated);

// GET all users
router.get('/', userController.getAllUsers);

// GET user by ID
router.get('/:id', userController.getUserById);

// POST create new user
router.post('/', userController.createUser);

// PUT update user by ID
router.put('/:id', userController.updateUser);

// DELETE user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
