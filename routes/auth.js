const express = require('express');
const router = express.Router();

/* GET sign up page. */
router.get('/sign-up', function (req, res, next) {
  res.render('sign_up_form', { title: 'Sign Up' });
});

router.post('/sign-up');

module.exports = router;
