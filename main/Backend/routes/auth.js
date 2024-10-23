 express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
// const User = require('./models/User'); // Import the User model
const User = require('../models/User')
const router = express.Router();



// Signup route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user and save it to the database
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    user: {
      email: newUser.email,
      name: 'New User', // Adjust according to your data
    },
  });
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)

  // Find the user in the database
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid credentials' });
  }

  // Check if the password matches using bcrypt
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Send response with success flag, token, and user data
  res.json({
    success: true,
    token,  // Sending the token for future authenticated requests
    user: {
      email: user.email,
      name: 'Admin User',  // You can fetch the actual user name from the database if available
    }
  });
});

module.exports = router;
