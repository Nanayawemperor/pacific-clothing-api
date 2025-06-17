const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    position: { type: String, required: true, trim: true }
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model('Employee', employeeSchema);

