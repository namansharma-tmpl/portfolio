const express = require('express');

const router = express.Router();

const tagController = require('../controllers/tag');

router.get('/', tagController.tags);

module.exports = router;