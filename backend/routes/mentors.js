const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all mentors
router.get('/', async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' }).select('-password -tokens');
    res.send(mentors);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;