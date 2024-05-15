const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('../passport');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.logInGet = (req, res, next) => {
  res.render('log_in_form', { title: 'Log In' });
};

exports.logInPost = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); // Pass errors to next error handler
    }
    if (!user) {
      // Login failed - display error message
      res.render('log_in_form', {
        title: 'Log In',
        errorMessage: 'Invalid username or password', // Customize the message
      });
    } else {
      // Login successful - redirect to home
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/');
      });
    }
  })(req, res, next);
};

exports.signUpGet = (req, res, next) => {
  res.render('sign_up_form', { title: 'Sign Up' });
};

exports.signUpPost = [
  // Validate and sanitize User data
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required!')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters.'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required!')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('Email already exists!');
      }
      return true;
    })
    .withMessage('Email already exists!'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/^(?=.*\d)(?=.*[!@#$%^&*])/)
    .withMessage(
      'Password must contain at least one number and one special character!'
    ),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Hash password before creating the user object
    const saltRounds = 10; // Adjust saltRounds as needed
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    if (!errors.isEmpty()) {
      res.render('sign_up_form', {
        title: 'Sign Up',
        user,
        errors: errors.array(),
      });
    } else {
      await user.save();
      res.redirect('/log-in');
    }
  }),
];

// Log out user

exports.logOutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
