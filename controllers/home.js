const db = require('../models/index');
const createError = require('http-errors');

async function projectCategories(req, res, next){
    try {
        let result = await db.ProjectCategory.findAll({
            attributes: {
                include: ['id', 'value', 'image'],
            }
        })
        res.status(200).json(result);
        return;
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
        return;
    }
}

async function aboutMe(req, res, next){
    try {
        let result = await db.Author.findOne({
            attributes: {            
                exclude: ['updatedAt', 'createdAt', 'id', 'email']
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


async function projectsByCategory(req, res, next){
    try {
        let projectCategoryExists = await db.ProjectCategory.findByPk(req.params.categoryId);
        if (!projectCategoryExists){
            next(createError(404, "Project category does not exist"));
            return;
        }
        let result = await db.Project.findAll({
            where: {
                ProjectCategoryId: req.params.categoryId,
            },
            attributes: {
                include: ['name', 'link', 'image'],
            }
        });
        res.status(200).json(result);
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
        return;
    }
}

async function blogsByPage(req, res, next){
    try {
        req.query.pageNo = parseInt(req.query.pageNo);
        if (!req.query.pageNo || req.query.pageNo < 1){
            next(createError(404, "Wrong page number"));
            return;
        }        
        let totalBlogs = await db.Blog.count();
        if (Math.ceil(totalBlogs / process.env.BLOGS_PER_PAGE) < req.query.pageNo){
            next(createError(404, "Wrong page number"));
            return;
        }    
        let result = {};
        result.blogs = await db.Blog.findAll({
            limit: process.env.BLOGS_PER_PAGE,
            offset: (req.query.pageNo - 1) * process.env.BLOGS_PER_PAGE,
            attributes: {
                exclude: ['content', 'updatedAt', 'CategoryId', 'views', 'AuthorId'],
            },
            include: {
                model: db.Author,
                attributes: ['firstName', 'lastName'],
            }
        });
        result.end = Math.ceil(totalBlogs / process.env.BLOGS_PER_PAGE) === req.query.pageNo? true: false;
        result.maxBlogs = totalBlogs;
        result.numberOfBlogsPerPage = process.env.BLOGS_PER_PAGE;
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
    blogsByPage,
    aboutMe,
    projectCategories,
    projectsByCategory,
}