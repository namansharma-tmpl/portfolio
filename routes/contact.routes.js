const express = require('express');

const router = express();

const contact_mw = require('../middleware/contact.mw');

router.post('/', async (req, res, next) => {    
    const ans = await contact_mw.send_mail(req.body);
    res.set('Content-type', 'application/json');
    if (ans.status === 500){
        res.status(500).json({"error": "something went wrong"});
    }
    else if (ans.status === 404){
        res.status(404).json({"error": "page not found"});
    }
    else if (ans.status == 400){
        res.status(400).json({"error": "Missing or invalid details"});
    }
    else {
        delete ans.status;
        res.status(200).json(ans.result);
    }
});

module.exports = router;