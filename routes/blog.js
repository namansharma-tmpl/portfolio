const express = require('express');

const router = express.Router();

const blogController = require('../controllers/blog.js');

router.get('/', blogController.blogs);
router.get('/popular-posts', blogController.popularPosts);
router.get('/suggestions/:categoryId', blogController.suggestions);
router.get('/:blogId', blogController.singleBlog);
router.get('/comments/:blogId', blogController.comments);
router.post('/comment/:blogId', blogController.postComment);

module.exports = router;
