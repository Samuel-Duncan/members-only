const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/* GET log in page. */
router.get('/', authController.logInGet);

router.post('/', authController.logInPost);

module.exports = router;
