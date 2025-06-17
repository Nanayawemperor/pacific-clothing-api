const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true }
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model('Department', departmentSchema);
