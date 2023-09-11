const express = require('express');

const router = express.Router();

const search_mw = require('../middleware/search.mw');

const functions = require('./functions');

router.get('/', async (req, res, next) => {
    const ans = await search_mw.search(req.query.searchquery);
    functions.return_response(res, ans);
});

module.exports = router;