const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PUBLIC_PORT || 3000;

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// Import models
const Login = require('./Models/Login');
const Signup = require('./Models/Signup');

// GET API for Login collection
app.get('/api/login', async (req, res) => {
  try {
    const loginData = await Login.find();
    console.log("Fetched Login Data:", loginData);  // Debugging line
    res.json(loginData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching login data', error });
  }
});


// GET API for Signup collection
app.get('/api/signup', async (req, res) => {
  try {
    const signupData = await Signup.find();
    res.json(signupData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching signup data', error });
  }
});

// Define the ping route with the response in JSON
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;
