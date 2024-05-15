const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/* GET log in page. */
router.get('/', authController.logOutGet);

module.exports = router;
