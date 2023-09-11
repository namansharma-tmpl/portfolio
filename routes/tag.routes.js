const express = require('express');

const router = express.Router();

const tag_mw = require('../middleware/tag.mw');

const functions = require('./functions');

router.get('/', async (req, res, next) => {
    const ans = await tag_mw.get_all_tags();
    functions.return_response(res, ans);
});

module.exports = router;