const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController');
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');

router.get('/', controller.getAll);

// Protect create, update, delete
router.post('/', ensureAuthenticated, controller.create);
router.put('/:id', ensureAuthenticated, controller.update);
router.delete('/:id', ensureAdmin, controller.remove);

module.exports = router;
