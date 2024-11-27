const express = require('express');
const router = express.Router();
const User = require('../models/signup');
const bcrypt = require('bcrypt');

// Handle signup
router.post('/', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET API to fetch user details by email
router.get('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
});

// PUT API to update user details
router.put('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { name, username, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user and update
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.username = username || user.username;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile', error });
  }
});

module.exports = router;
