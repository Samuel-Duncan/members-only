const express = require('express');
const router = express.Router();
const passport = require('../passport');

/* GET log in page. */
router.get('/', function (req, res, next) {
  res.render('log_in_form', { title: 'Log In' });
});

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
  })
);

module.exports = router;
