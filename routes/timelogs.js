const express = require('express');
const router = express.Router();
const timelogController = require('../controllers/timelogController'); // fix variable name consistency
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

router.use(ensureAuthenticated);

router.get('/', timelogController.getAllTimelogs);
router.post('/', timelogController.createTimelog);
router.put('/:id', timelogController.updateTimelog);  // need to add this in controller
router.delete('/:id', timelogController.deleteTimelog);

module.exports = router;
