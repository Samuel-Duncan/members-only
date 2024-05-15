const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/* GET sign up page. */
router.get('/', authController.signUpGet);

router.post('/', authController.signUpPost);

module.exports = router;
