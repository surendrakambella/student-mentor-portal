const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// =============================
// Book a session
// =============================
router.post('/', auth, async (req, res) => {
  try {
    const { mentorId, date, time } = req.body;

    // Validate input
    if (!mentorId || !date || !time) {
      return res.status(400).json({ error: 'Mentor, date, and time are required' });
    }

    // Ensure user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Only students can book sessions' });
    }

    // Validate mentor existence and role
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Check if the slot is already booked
    const existingBooking = await Booking.findOne({
      mentor: mentorId,
      date,
      time,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'This time slot is already booked' });
    }

    // Create and save booking
    const booking = new Booking({
      student: req.user._id,
      mentor: mentorId,
      date,
      time,
      status: 'confirmed'
    });

    await booking.save();

    // Populate related fields
    const populatedBooking = await Booking.findById(booking._id)
      .populate('mentor', 'name email')
      .populate('student', 'name email');

    res.status(201).json(populatedBooking);

  } catch (error) {
    console.error('Booking error:', error.message);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

module.exports = router;
