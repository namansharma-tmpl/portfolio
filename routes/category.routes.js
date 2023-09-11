const express = require('express');

const router = express.Router();

const category_mw = require('../middleware/category.mw');

const functions = require('./functions');

router.get('/', async (req, res, next) => {
    const ans = await category_mw.get_all_categories();
    functions.return_response(res, ans);
});

module.exports = router;