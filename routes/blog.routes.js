const express = require('express');

const router = express.Router();

const blog_mw = require('../middleware/blog.mw');

const functions = require('./functions');


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
    functions.return_response(res, ans);
});


router.get('/popular-posts', async (req, res, next) => {
    const ans = await blog_mw.get_popular_posts();
    functions.return_response(res, ans);
});


router.get('/suggestions/:categoryId', async (req, res, next) => {
    const ans = await blog_mw.get_suggestions(req.params.categoryId);
    functions.return_response(res, ans);    
});


router.get('/:blogId', async (req, res, next) => {    
    const ans = await blog_mw.get_single_blog(req.params.blogId);
    functions.return_response(res, ans);
});

router.get('/comments/:blogId', async (req, res, next) => {
    const ans = await blog_mw.get_comments(req.params.blogId);
    functions.return_response(res, ans);
});


router.post('/comment/:blogId', async (req, res, next) => {
    if (!('body' in req)){
        res.status(400).json({"error": "missing or invalid details"});
    }
    const ans = await blog_mw.post_comment(req.params.blogId, req.body);
    functions.return_response(res, ans);
});


module.exports = router;
