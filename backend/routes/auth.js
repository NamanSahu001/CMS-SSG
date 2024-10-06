// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  
  await newUser.save();
  res.status(201).json({ message: 'User created' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  console.log('User:', user); // Log user to see if found

  if (!user) {
      return res.status(401).json({ message: 'Invalid credentials: User not found' });
  }

  const isMatch = await bcrypt.hash(password, 10);
  console.log('Password match:', isMatch); // Log password comparison result

  if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials: Incorrect password' });
  }
  const userId = user._id;
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token  , userId});
});


module.exports = router;
