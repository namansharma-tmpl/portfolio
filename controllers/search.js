const db = require('../models/index');
const {Op} = require('sequelize');
const createError = require('http-errors');

async function search(req, res, next){    
    try {
        req.query.searchquery = '%' + req.query.searchquery + '%';
        let result = await db.Blog.findAll({
            where: {
                [Op.or]: [{
                    title: {
                        [Op.iLike]: req.query.searchquery,
                    }}, {
                    shortDescription: {
                        [Op.iLike]: req.query.searchquery,
                    }},
                ]
            },
            attributes: {
                exclude: ['updatedAt', 'content', 'AuthorId', 'CategoryId'],
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

module.exports = {
    search,
}