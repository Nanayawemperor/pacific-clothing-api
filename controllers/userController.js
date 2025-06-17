const User = require('../models/user');

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create user
exports.createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // TODO: Validate inputs here or in route middleware

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update user
exports.updateUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // TODO: Validate inputs here or in route middleware

    // Find user by ID
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update fields if provided
    if (username) user.username = username;
    if (role) user.role = role;
    if (password) user.password = password; // Will be hashed by pre('save') hook

    await user.save();

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
