const express = require('express');
const router = express.Router();
const timelogController = require('../controllers/timelogController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const mongoose = require('mongoose');

// Middleware to validate MongoDB ObjectId for :id param
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid timelog ID' });
  }
  next();
};

// Protect all routes
router.use(ensureAuthenticated);

// GET all timelogs
router.get('/', timelogController.getAllTimelogs);

// POST create new timelog
router.post('/', timelogController.createTimelog);

// PUT update timelog by ID
router.put('/:id', validateObjectId, timelogController.updateTimelog);

// DELETE timelog by ID
router.delete('/:id', validateObjectId, timelogController.deleteTimelog);

module.exports = router;
