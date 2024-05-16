const express = require('express');
const router = express.Router();
const Message = require('../models/message');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const messages = await Message.find()
    .sort({ timestamp: -1 })
    .populate('author', 'firstName');
  res.render('index', { title: 'Members Only', messages: messages });
});

module.exports = router;
