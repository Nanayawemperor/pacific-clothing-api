const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'yoursecret', {
      expiresIn: '1d'
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
