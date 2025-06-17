const Timelog = require('../models/timelog');
const mongoose = require('mongoose');

// GET all timelogs with user username populated
exports.getAllTimelogs = async (req, res) => {
  try {
    const timelogs = await Timelog.find().populate('user', 'username');
    res.json(timelogs);
  } catch (err) {
    console.error('Error fetching timelogs:', err);
    res.status(500).json({ message: 'Server error fetching timelogs' });
  }
};

// POST create new timelog
exports.createTimelog = async (req, res) => {
  const { user, clockIn, clockOut, notes } = req.body;

  // Basic validation
  if (!user || !clockIn) {
    return res.status(400).json({ message: 'User and clockIn are required' });
  }

  if (!mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const newLog = await Timelog.create({ user, clockIn, clockOut, notes });
    // Populate user before returning
    await newLog.populate('user', 'username').execPopulate();
    res.status(201).json(newLog);
  } catch (err) {
    console.error('Error creating timelog:', err);
    res.status(400).json({ message: err.message });
  }
};

// GET timelog by ID
exports.getTimelogById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid timelog ID' });
  }

  try {
    const log = await Timelog.findById(id).populate('user', 'username');
    if (!log) return res.status(404).json({ message: 'Timelog not found' });
    res.json(log);
  } catch (err) {
    console.error('Error fetching timelog:', err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE timelog by ID
exports.updateTimelog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid timelog ID' });
  }

  // Optional: whitelist allowed update fields
  const allowedFields = ['clockIn', 'clockOut', 'notes'];
  const updateData = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: 'No valid fields provided for update' });
  }

  try {
    const updatedLog = await Timelog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('user', 'username');

    if (!updatedLog) return res.status(404).json({ message: 'Timelog not found' });

    res.json(updatedLog);
  } catch (err) {
    console.error('Error updating timelog:', err);
    res.status(400).json({ message: err.message });
  }
};

// DELETE timelog by ID
exports.deleteTimelog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid timelog ID' });
  }

  try {
    const deleted = await Timelog.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Timelog not found' });
    res.json({ message: 'Timelog deleted' });
  } catch (err) {
    console.error('Error deleting timelog:', err);
    res.status(500).json({ message: err.message });
  }
};
