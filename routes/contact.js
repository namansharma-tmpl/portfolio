const express = require('express');

const router = express();

const contactController = require('../controllers/contact');

router.post('/', contactController.contact);

module.exports = router;