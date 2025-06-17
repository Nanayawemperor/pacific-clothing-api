const mongoose = require('mongoose');

const timelogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    clockIn: { type: Date, required: true },
    clockOut: {
      type: Date,
      validate: {
        validator: function(value) {
          // clockOut must be after clockIn if provided
          return !value || value >= this.clockIn;
        },
        message: 'clockOut must be greater than or equal to clockIn'
      }
    },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Timelog', timelogSchema);

