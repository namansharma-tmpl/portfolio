const express = require('express');

const router = express.Router();

const home_mw = require('../middleware/home.mw');

router.get('/about-me', async (req, res, next) => {
    const ans = await home_mw.get_about_me();
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

router.get('/project-categories', async (req, res, next) => {
    const ans = await home_mw.get_project_categories();
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

router.get('/projects', async (req, res, next) => {
    const ans = await home_mw.get_projects_by_category(req.query.categoryId);
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

router.get('/blogs', async (req, res, next) => {
    const ans = await home_mw.get_blogs_by_page(req.query.pageNo);
    res.set('Content-type', 'application/json');
    if (ans.status === 500){
        res.status(500).json({"error": "something went wrong"});
    }
    else if (ans.status === 404){
        res.status(404).json({"error": "page not found"});
    }
    else {
        delete ans.status;
        res.status(200).json(ans);
    }
    next();
});


module.exports = router;