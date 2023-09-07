const db = require('../models/index.js');
const category_controller = require('./category.controller.js');

const {Op} = require('sequelize');

async function increment_views(blogId){
    return await db.Blog.increment({
        views: 1,
    }, {
        where: {
            id: blogId,
        }
    })
}

async function set_author_name(blogs){    
    for (let value of blogs){
        let author = await value.getAuthor();        
        value.dataValues.firstName = author.firstName;
        value.dataValues.lastName = author.lastName;
        delete value.dataValues.AuthorId;
    }    
}

async function get_blogs_of_categories(categories){
    let result = new Array();
    
    for (let value of categories){
        let temp = await db.Blog.findAll({
            where: {
                CategoryId: value.id,
            },
            attributes: {
                include: ['id', 'title', 'shortDescription', 'createdAt', 'image'],
                exclude: ['updatedAt', 'CategoryId'],
            },
            limit: 3,
        });

        await set_author_name(temp);

        let obj = {
           categoryValue: value.getDataValue('value'),
           categoryId: value.getDataValue('id'),
           blogs: temp,
        }

        result.push(obj);
    }
    return result;
    // await categories.forEach(async (value) => { // didn't work
    //     let temp = await value.getBlogs();
    //     result.push(temp);
    // })    
}

async function total_blogs(){
    let total_pages = await db.Blog.count();
    return total_pages;
}

async function get_blogs_by_page(pageNo){    
    let result = await db.Blog.findAll({
        limit: process.env.BLOGS_PER_PAGE,
        offset: (pageNo - 1) * process.env.BLOGS_PER_PAGE,
        attributes: {
            exclude: ['content', 'updatedAt', 'CategoryId', 'views'],
        }
    });
    for (let obj of result){
        let author = await obj.getAuthor();
        obj.dataValues.firstName = author.firstName;
        obj.dataValues.lastName = author.lastName;
        delete obj.dataValues.AuthorId;
    }
    return result;
}

async function get_blog_by_id(blogId){
    return await db.Blog.findByPk(blogId);
}

async function get_previous_post(createdAt){
    const time = new Date(createdAt);
    return await db.Blog.findOne({        
        where: {
            createdAt: {
                [Op.lt]: time,
            },
        },        
    });
}

async function get_next_post(createdAt){
    const time = new Date(createdAt);
    return await db.Blog.findOne({
        where: {
            createdAt: {
                [Op.gt]: time,
            },
        },        
    });
}

module.exports = {
    get_previous_post,
    get_next_post,
    increment_views,
    get_blogs_of_categories,
    total_blogs,
    get_blogs_by_page,    
    get_blog_by_id,
}