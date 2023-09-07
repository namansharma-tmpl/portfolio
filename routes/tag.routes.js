const express = require('express');

const router = express.Router();

const tag_mw = require('../middleware/tag.mw');

router.get('/', async (req, res, next) => {
    const ans = await tag_mw.get_all_tags();
    res.set('Content-type', 'application/json');
    if (ans.status === 500){
        res.status(500).json({"error": "something went wrong"});
    }
    else if (ans.status === 404){
        res.status(404).json({"error": "page not found"});
    }
    else {
        delete ans.status;
        res.status(200).json(ans.result);
    }
    next();
});

module.exports = router;