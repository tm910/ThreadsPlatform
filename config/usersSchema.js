const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String, // URL or path to avatar image
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
