const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Create JWT token payload
    const payload = {
      id: user._id,
      username: user.username,
    };

    // Sign token (use your secret and options)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token }); // Send token to client
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
