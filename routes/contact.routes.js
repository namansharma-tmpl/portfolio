const express = require('express');

const router = express();

const contact_mw = require('../middleware/contact.mw');

const functions = require('./functions');

router.post('/', async (req, res, next) => {    
    const ans = await contact_mw.send_mail(req.body);
    functions.return_response(res, ans);
});

module.exports = router;