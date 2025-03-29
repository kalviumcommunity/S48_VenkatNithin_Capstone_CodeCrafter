const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    default: 'Anonymous',
  },
  comment: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Course Schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  comments: [commentSchema], // Embed comments directly in course schema
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
