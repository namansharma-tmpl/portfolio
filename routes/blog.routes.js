const express = require('express');

const router = express.Router();

const blog_mw = require('../middleware/blog.mw');


router.get('/', async (req, res, next) => {
    let ans;
    // ans = await blog_mw.get_blogs_by_categories();
    if ('categoryId' in req.query){
        ans = await blog_mw.get_blogs_by_category(req.query.categoryId);
    }
    else if ('tagId' in req.query){
        ans = await blog_mw.get_blogs_by_tag(req.query.tagId);
    }
    else {
        ans = await blog_mw.get_blogs_by_categories();
    }
    res.set("Content-type", "application/json");
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


router.get('/:blogId', async (req, res, next) => {    
    const ans = await blog_mw.get_single_blog(req.params.blogId);
    res.set("Content-type", "application/json");
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

router.get('/comments/:blogId', async (req, res, next) => {
    const ans = await blog_mw.get_comments(req.params.blogId);
    res.set("Content-type", "application/json");
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
