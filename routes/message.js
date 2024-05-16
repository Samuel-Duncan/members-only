const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.newMessageGet);

router.post('/', messageController.newMessagePost);

module.exports = router;
