const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  position: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);

