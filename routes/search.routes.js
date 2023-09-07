const express = require('express');

const router = express.Router();

const search_mw = require('../middleware/search.mw');

router.get('/', async (req, res, next) => {
    const ans = await search_mw.search(req.query.searchquery);
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
});

module.exports = router;