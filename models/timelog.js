const mongoose = require('mongoose');

const timelogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  clockIn: { type: Date, required: true },
  clockOut: { type: Date },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Timelog', timelogSchema);
