const db = require('../models/index');
const author_controller = require('./author.controller');

async function get_categories(){
    let categories = await db.Category.findAll({
        attributes: {
            exclude: ['updatedAt', 'createdAt'],
        }
    });    
    return categories;
}

async function get_category(categoryId){
    return await db.Category.findByPk(categoryId);
}

async function get_blogs_of_category(category){
    let result;
    result = await category.getBlogs({
        attributes: {
            exclude: ['CategoryId', 'views', 'content', 'updatedAt'],
        }
    });
    let author = await author_controller.get_author_details();
    for (let obj of result){        
        obj.dataValues.firstName = author.firstName;
        obj.dataValues.lastName = author.lastName;
        delete obj.dataValues.AuthorId;
    }
    return result;
}

module.exports = {
    get_categories,
    get_category,
    get_blogs_of_category,
}