const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

/* GET sign up page. */
router.get('/', function (req, res, next) {
  res.render('sign_up_form', { title: 'Sign Up' });
});

router.post('/', authController.signUpPost);

module.exports = router;
