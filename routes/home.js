const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home');

router.get('/about-me', homeController.aboutMe);

router.get('/project-categories', homeController.projectCategories);

router.get('/projects/:categoryId', homeController.projectsByCategory);

router.get('/blogs', homeController.blogsByPage);

module.exports = router;