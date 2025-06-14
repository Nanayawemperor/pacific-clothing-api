const Timelog = require('../models/timelog');

// GET all timelogs
exports.getAllTimelogs = async (req, res) => {
  try {
    const timelogs = await Timelog.find().populate('user', 'username');
    res.json(timelogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new timelog
exports.createTimelog = async (req, res) => {
  const { user, clockIn, clockOut, notes } = req.body;
  try {
    const newLog = await Timelog.create({ user, clockIn, clockOut, notes });
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET timelog by ID
exports.getTimelogById = async (req, res) => {
  try {
    const log = await Timelog.findById(req.params.id).populate('user', 'username');
    if (!log) return res.status(404).json({ message: 'Timelog not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE timelog
exports.updateTimelog = async (req, res) => {
  try {
    const updatedLog = await Timelog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLog) return res.status(404).json({ message: 'Timelog not found' });
    res.json(updatedLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// DELETE timelog
exports.deleteTimelog = async (req, res) => {
  try {
    await Timelog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Timelog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
