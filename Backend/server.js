const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PUBLIC_PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// Import models
const Signup = require('./models/Signup'); // Signup model

// GET API for Signup collection
app.get('/api/signup', async (req, res) => {
  try {
    const signupData = await Signup.find();
    res.json(signupData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching signup data', error });
  }
});

// POST API for Signup collection
app.post('/api/signup', async (req, res) => {
  try {
    const newSignup = new Signup(req.body);
    await newSignup.save();
    res.status(201).json(newSignup);
  } catch (error) {
    res.status(400).json({ message: 'Error creating new signup', error });
  }
});

// POST API for Login - checks against Signup collection
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Signup.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If login is successful
    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login', error });
  }
});

// GET API to fetch user details by email
app.get('/api/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await Signup.findOne({ email });

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
app.put('/api/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { name, username, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user by email
    const user = await Signup.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's details
    user.name = name || user.name;
    user.username = username || user.username;
    user.password = password || user.password; // In production, ensure hashing of new password

    await user.save(); // Save the updated user data

    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile', error });
  }
});

// Define the ping route with the response in JSON
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Start the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;