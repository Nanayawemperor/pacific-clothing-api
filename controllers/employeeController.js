const mongoose = require('mongoose');
const Employee = require('../models/employee');

// GET all employees
const getAll = async (req, res) => {
  try {
    // Populate department info in employee documents
    const employees = await Employee.find().populate('department');
    res.status(200).json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Server error fetching employees' });
  }
};

// POST create new employee
const create = async (req, res) => {
  const { firstName, lastName, department, position } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !department || !position) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate department ID format
  if (!mongoose.Types.ObjectId.isValid(department)) {
    return res.status(400).json({ message: 'Invalid department ID' });
  }

  try {
    const employee = new Employee({ firstName, lastName, department, position });
    const saved = await employee.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(400).json({ message: err.message });
  }
};

// PUT update employee by ID
const update = async (req, res) => {
  const { id } = req.params;

  // Validate employee ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid employee ID' });
  }

  // Only include fields that are provided (avoid overwriting with undefined)
  const updateFields = {};
  const allowedFields = ['firstName', 'lastName', 'department', 'position'];
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  }

  // If department is being updated, validate its ID
  if (updateFields.department && !mongoose.Types.ObjectId.isValid(updateFields.department)) {
    return res.status(400).json({ message: 'Invalid department ID' });
  }

  try {
    const updated = await Employee.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    }).populate('department');

    if (!updated) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(400).json({ message: err.message });
  }
};

// DELETE employee by ID
const remove = async (req, res) => {
  const { id } = req.params;

  // Validate employee ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid employee ID' });
  }

  try {
    const deleted = await Employee.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
