const express = require('express');
const router = express.Router();
const db = require('../models');
const Message = db.messages;
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Get messages for a room
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { room = 'public' } = req.query;
    const messages = await Message.findAll({
      where: { room },
      include: [{
        model: db.users,
        as: 'sender',
        attributes: ['username']
      }],
      order: [['createdAt', 'DESC']],
      limit: 50
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a message
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content, room = 'public', receiverId } = req.body;
    const message = await Message.create({
      content,
      room,
      senderId: req.user.id,
      receiverId
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;