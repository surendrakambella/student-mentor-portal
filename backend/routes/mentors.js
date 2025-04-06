const express = require('express');
const User = require('../models/User');

const router = express.Router();

// =============================
// Get all mentors
// =============================
router.get('/', async (req, res) => {
  try {
    const mentors = await User.find({ role: 'mentor' }).select('-password');
    res.status(200).json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error.message);
    res.status(500).json({ error: 'Failed to fetch mentors' });
  }
});

module.exports = router;