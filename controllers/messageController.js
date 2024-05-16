const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Message = require('../models/message');
const User = require('../models/user');

exports.newMessageGet = (req, res, next) => {
  res.render('message_form', { title: 'New Message' });
};

exports.newMessagePost = [
  body('title')
    .trim() // Sanitize by trimming whitespace
    .notEmpty()
    .withMessage('Title is required!')
    .isLength({ min: 3, max: 100 }) // Set minimum and maximum length
    .withMessage('Title must be between 3 and 100 characters'),
  body('text')
    .trim() // Sanitize by trimming whitespace
    .notEmpty()
    .withMessage('Message text is required!')
    .isLength({ min: 2, max: 1000 }) // Set minimum and maximum length
    .withMessage('Message must be between 2 and 1000 characters'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = await User.findById(req.user._id, { firstName: 1, _id: 1 });
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      author: user._id,
    });

    if (!errors.isEmpty()) {
      res.render('message_form', {
        title: 'New Message',
        message,
        errors: errors.array(),
      });
    } else {
      await message.save();
      const messages = await Message.find()
        .sort({ timestamp: -1 })
        .populate('author', 'firstName');
      res.redirect('/');
    }
  }),
];
