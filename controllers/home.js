const db = require('../models/index');
const createError = require('http-errors');
const redis = require('redis');

let redisClient;

(async () => {
	redisClient = redis.createClient({
        url: process.env.REDIS_URL
    });

	redisClient.on("error", (error) => console.error(`Error : ${error}`));

	await redisClient.connect();
})();


async function projectCategories(req, res, next){
    try {
        let result;
        const cacheResults = await redisClient.get('project-categories');
        if (cacheResults) {            
            result = JSON.parse(cacheResults);
            res.status(200).json(result);
            return;
        }
        result = await db.ProjectCategory.findAll({
            attributes: {
                exclude: ['image', 'createdAt', 'updatedAt', '']
            }
        })
        await redisClient.set('project-categories', JSON.stringify(result));
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
        let result;
        const cacheResults = await redisClient.get('about-me');
        if (cacheResults) {            
            result = JSON.parse(cacheResults);
            res.status(200).json(result);
            return;
        }
        result = await db.Author.findOne({
            attributes: {            
                exclude: ['updatedAt', 'createdAt', 'id', 'email']
            },
        });
        await redisClient.set('about-me', JSON.stringify(result));
        res.status(200).json(result);
        return;
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
        return;
    }    
}


async function projects(req, res, next){
    try {
        let result;
        const cacheResults = await redisClient.get('projects');
        if (cacheResults) {            
            result = JSON.parse(cacheResults);
            res.status(200).json(result);
            return;
        }
        result = await db.Project.findAll({
            attributes: {
                exclude: ['id', 'description', 'createdAt', 'updatedAt', 'AuthorId'],
            }
        });
        await redisClient.set('projects', JSON.stringify(result));
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
        let result;
        const cacheResults = await redisClient.get('projects#' + req.params.categoryId);
        if (cacheResults) {            
            result = JSON.parse(cacheResults);
            res.status(200).json(result);
            return;
        }
        result = await db.Project.findAll({
            where: {
                ProjectCategoryId: req.params.categoryId,
            },
            attributes: {
                include: ['name', 'link', 'image'],
            }
        });
        await redisClient.set('projects#' + req.params.categoryId, JSON.stringify(result));
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
        const {perPage} = req.query
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
        const cacheResults = await redisClient.get('blogsByPage#' + req.query.pageNo + '#' + perPage);
        if (cacheResults) {            
            result = JSON.parse(cacheResults);
            res.status(200).json(result);
            return;
        }
        result.blogs = await db.Blog.findAll({
            limit: perPage || process.env.BLOGS_PER_PAGE,
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
        result.numberOfBlogsPerPage = perPage || process.env.BLOGS_PER_PAGE;
        await redisClient.set('blogsByPage#' + req.query.pageNo + '#' + perPage, JSON.stringify(result));
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
    projects,
    projectCategories,
    projectsByCategory,
}