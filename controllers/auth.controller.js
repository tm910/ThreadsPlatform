// auth.controller.js
// Handles authentication logic
require('dotenv').config();
const User = require('../config/usersSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// Signup controller
 async function signup (req, res) {
  try {
    const { username, email, password } = req.body;
    // Check if user exists
    const existingUserWithEm = await User.findOne({ email });
    if (existingUserWithEm) {
      return res.status(400).json({success: false, message: 'Email already exists' });
    }
    const existingUserWithUn = await User.findOne({ username });
    if (existingUserWithUn) {
      return res.status(400).json({success: false, message: 'Username already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({success: false, message: 'Server error', error: err.message });
  }
}; 
 async function login (req, res) {
  try {
    const { email, password } = req.body;
    // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Email or password is incorrect',
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'كلمة المرور غير صحيحة' });
      // إنشاء التوكن
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
      },
      process.env.SECRET_KEY,
      { expiresIn: '7d' } // مدة صلاحية التوكن
    );
    
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000
      });
    res.json({
      success: true,
      message: 'Login successful',
      token,
    });
      
  } catch (err) {
    res.status(500).json({
        success: false,
        message: 'Server error',
        error: err.message,
    });
  }
}; 
module.exports = {signup, login}   