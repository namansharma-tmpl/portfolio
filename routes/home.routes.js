const express = require('express');

const router = express.Router();

const functions = require('./functions');

const home_mw = require('../middleware/home.mw');

router.get('/about-me', async (req, res, next) => {
    const ans = await home_mw.get_about_me();
    functions.return_response(res, ans);
});

router.get('/project-categories', async (req, res, next) => {
    const ans = await home_mw.get_project_categories();
    res.set('Content-type', 'application/json');
    functions.return_response(res, ans);
});

router.get('/projects', async (req, res, next) => {
    const ans = await home_mw.get_projects_by_category(req.query.categoryId);
    functions.return_response(res, ans);
});

router.get('/blogs', async (req, res, next) => {
    const ans = await home_mw.get_blogs_by_page(req.query.pageNo);
    functions.return_response(res, ans);
});


module.exports = router;