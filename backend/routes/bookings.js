const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Book a session
router.post('/', auth, async (req, res) => {
  try {
    // Verify user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ 
        error: 'Only students can book sessions' 
      });
    }

    // Verify mentor exists
    const mentor = await User.findById(req.body.mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ 
        error: 'Mentor not found' 
      });
    }

    // Check if slot is available
    const existingBooking = await Booking.findOne({
      mentor: req.body.mentorId,
      date: req.body.date,
      time: req.body.time,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({ 
        error: 'This time slot is already booked' 
      });
    }

    // Create new booking
    const booking = new Booking({
      student: req.user._id,
      mentor: req.body.mentorId,
      date: req.body.date,
      time: req.body.time,
      status: 'confirmed'
    });

    await booking.save();
    
    // Populate mentor details
    const populatedBooking = await Booking.findById(booking._id)
      .populate('mentor', 'name email')
      .populate('student', 'name email');

    res.status(201).json(populatedBooking);

  } catch (error) {
    console.error('Booking error:', error);
    res.status(400).json({ 
      error: error.message || 'Failed to create booking' 
    });
  }
});

module.exports = router;