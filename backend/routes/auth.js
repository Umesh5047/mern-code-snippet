const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include valid email').isEmail(),
  check('password', 'Password min 6 chars').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req); if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ msg: 'User already exists' });
    user = new User({ name, email, password: await bcrypt.hash(password, 10) });
    await user.save();
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if(err) throw err; res.json({ token });
    });
  } catch (err) { res.status(500).send('Server error'); }
});

router.post('/login', [
  check('email', 'Include valid email').isEmail(),
  check('password', 'Password required').exists()
], async (req, res) => {
  const errors = validationResult(req); if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }); if(!user) return res.status(400).json({ msg: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if(err) throw err; res.json({ token });
    });
  } catch (err) { res.status(500).send('Server error'); }
});

module.exports = router;

