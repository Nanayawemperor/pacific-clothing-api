const mongoose = require('mongoose');
const Department = require('../models/department');

// GET all departments
const getAll = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    console.error('Error fetching departments:', err);
    res.status(500).json({ message: 'Server error fetching departments' });
  }
};

// POST create new department
const create = async (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ message: 'Name and location are required' });
  }

  try {
    const department = new Department({ name, location });
    const saved = await department.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating department:', err);
    res.status(400).json({ message: err.message });
  }
};

// PUT update department by ID
const update = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid department ID' });
  }

  const { name, location } = req.body;
  const updateFields = { name, location };

  try {
    const updated = await Department.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating department:', err);
    res.status(400).json({ message: err.message });
  }
};

// DELETE department by ID
const remove = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid department ID' });
  }

  try {
    const deleted = await Department.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json({ message: 'Department deleted' });
  } catch (err) {
    console.error('Error deleting department:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove
};
