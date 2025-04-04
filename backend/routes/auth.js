const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    // Validate role
    if (!['student', 'mentor'].includes(req.body.role)) {
      return res.status(400).json({ error: 'Invalid role specified' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      expertise: req.body.role === 'mentor' ? req.body.expertise : undefined
    });

    // Save user (password gets hashed in pre-save hook)
    await user.save();

    // Generate token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return user data (without password)
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.tokens;

    res.status(201).json({ user: userResponse, token });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      error: error.message || 'Registration failed' 
    });
  }
});

module.exports = router;