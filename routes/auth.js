const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/* GET sign up page. */
router.get('/sign-up', authController.signUpGet);

router.post('/sign-up', authController.signUpPost);

/* GET log in page. */
router.get('/log-in', authController.logInGet);

router.post('/log-in', authController.logInPost);

/* GET log out page. */
router.get('/log-out', authController.logOutGet);

/* GET membership page. */
router.get('/membership', authController.membershipGet);

router.post('/membership', authController.membershipPost);

module.exports = router;
