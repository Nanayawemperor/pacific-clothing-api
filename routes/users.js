const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

router.use(ensureAuthenticated);

router.get('/', userController.getAllUsers);         // List all users
router.get('/:id', userController.getUserById);      // Get user by ID
router.post('/', userController.createUser);         // Create user
router.put('/:id', userController.updateUser);       // Update user
router.delete('/:id', userController.deleteUser);    // Delete user

module.exports = router;

