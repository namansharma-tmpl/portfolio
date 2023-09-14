const db = require('../models/index');
const {Op} = require('sequelize');
const createError = require('http-errors');

async function blogs(req, res, next){
    try {
        let result;
        if ('categoryId' in req.query){
            if (!req.query.categoryId){                
                next(createError(400, "Category id not provided"));
                return;
            }
            result = await db.Category.findByPk(req.query.categoryId, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                include: {
                    model: db.Blog,
                    attributes: ['id', 'title', 'shortDescription', 'image', 'createdAt'],
                    include: {
                        model: db.Author,
                        attributes: ['firstName', 'lastName'],
                    },
                }
            });            
        }
        else if ('tagId' in req.query){
            if (!req.query.tagId){
                next(createError(400, "Tag id not provided"));
                return;
            }
            result = await db.Tag.findByPk(req.query.tagId, {
                attributes: {
                    exclude: ['updatedAt', 'createdAt'],
                },
                include: {
                    model: db.Blog,
                    through: {
                        attributes: [],
                    },
                    attributes: ['id', 'title', 'shortDescription', 'image', 'createdAt'],
                    include: {
                        model: db.Author,
                        attributes: ['firstName', 'lastName'],
                    },
                }
            });            
        }
        else {
            result = await db.Category.findAll({
                attributes: {
                    exclude: ['updatedAt', 'createdAt'],
                },
                include: {
                    model: db.Blog,
                    attributes: ['id', 'title', 'shortDescription', 'image', 'createdAt'],
                    include: {
                        model: db.Author,
                        attributes: ['firstName', 'lastName'],
                    },
                }
            });
        }    
        res.status(200).json(result);
        return;
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
        return;
    }
}

async function singleBlog(req, res, next){
    try {
        let result = {};
        result.blog = await db.Blog.findByPk(req.params.blogId, {
            attributes: {
                exclude: ['updatedAt', 'AuthorId', 'CategoryId'],
            },
            include: [{
                model: db.Author,
                attributes: ['firstName', 'lastName'],
            }, {
                model: db.Category,
                attributes: ['value', 'id'],
            }, {
                model: db.Tag,
                attributes: ['value', 'id'],
                through: {
                    attributes: [],
                },
            }],
        });
        if (result.blog === null){
            next(createError(404, "Blog not found"));
            return;
        }
        await db.Blog.increment({
            views: 1,
        }, {
            where: {
                id: req.params.blogId,
            }
        });
        result.prevPost = await db.Blog.findOne({
            where: {                
                id: {
                    [Op.ne]: result.blog.id,
                },                
            },
            attributes: {
                exclude: ['views', 'content', 'createdAt', 'updatedAt', 'AuthorId', 'CategoryId']
            },
            order: db.sequelize.random(),
        });
        result.nextPost = await db.Blog.findOne({
            where: {
                createdAt: {
                    [Op.gte]: new Date(result.blog.createdAt),
                },
                id: {
                    [Op.ne]: result.blog.id,
                    [Op.ne]: result.prevPost.id,
                },
            },
            attributes: {
                exclude: ['views', 'content', 'createdAt', 'updatedAt', 'AuthorId', 'CategoryId']
            },
            ordering: db.sequelize.random(),
        });
        res.status(200).json(result);
        return;
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
        return;
    }
}


async function comments(req, res, next){
    try {
        let blog = await db.Blog.findByPk(req.params.blogId);
        if (blog === null){
            next(createError(404, "Blog not found"));
            return;
        }
        let result = await db.Comment.findAll({
            where: {
                BlogId: req.params.blogId,
                ReplyId: null,
            },
            attributes: {
                exclude: ['updatedAt', 'email', 'website', 'BlogId', 'ReplyId'],
            },
            include: {
                model: db.Comment,
                as: 'Replies',
                attributes: ['name', 'createdAt', 'message'],
            },
            ordering: [['createdAt']],
        });        
        res.status(200).json(result);
        return;
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
        return;
    }    
}



async function popularPosts(req, res, next){
    try {
        let result = await db.Blog.findAll({
            limit: process.env.POPULAR_POSTS_PER_PAGE,
            order: [
                ['views', 'DESC']
            ],
            attributes: {
                exclude: ['views', 'content', 'shortDescription', 'updatedAt', 'CategoryId', 'AuthorId'],
            },
            include: {
                model: db.Author,
                attributes: ['firstName', 'lastName'],
            }
        });
        res.status(200).json(result);
        return;
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
        return;
    }
}

async function suggestions(req, res, next){
    try {
        if (!req.params.categoryId){
            next(createError(400, "Invalid category id"));
            return;
        }
        let result = await db.Blog.findAll({
            where: {
                CategoryId: req.params.categoryId,                
            },
            attributes: {
                exclude: ['CategoryId', 'AuthorId', 'content', 'updatedAt', 'views'],
            },
            include: {
                model: db.Author,
                attributes: ['firstName', 'lastName'],
            },
        });        
        res.status(200).json(result);
        return;
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
        return;
    }
}


async function postComment(req, res, next){
    try {
        if (!req.body || !req.body.name || !req.body.message || req.body.name.length < 1 || req.body.message.length < 1){
            next(createError(400, "Missing or invalid details"));
            return;
        }
        let blog = await db.Blog.findByPk(req.params.blogId);
        if (blog === null){
            next(createError(404, "Blog not available"));
            return;
        }        
        let name = req.body.name;
        let message = req.body.message;
        let email = 'email' in req.body && req.body.email != null? req.body.email: '';
        let replyTo = 'replyTo' in req.body && req.body.replyTo != null? req.body.replyTo: '';
        if (replyTo.length){
            let replyComment = await db.Comment.findByPk(replyTo);
            if (!replyComment || replyComment.BlogId !== req.blogId){
                next(createError(400, "Missing or invalid details"));
                return;
            }
        }
        else {
            replyTo = null;
        }
        let result = await db.Comment.create({
            BlogId: req.params.blogId,
            name,
            message,
            email,
            ReplyId: replyTo,
        });
        delete result.dataValues.updatedAt;
        delete result.dataValues.ReplyId;
        res.status(200).json(result);
        return;
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
        return;
    }
}

module.exports = {
    postComment,
    comments,    
    singleBlog,
    blogs,
    popularPosts,
    suggestions,
};