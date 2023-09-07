const db = require('../models/index');
const author_controller = require('./author.controller');

async function get_all_tags(){
    return await db.Tag.findAll();
}

async function get_tag(tagId){
    return await db.Tag.findByPk(tagId);
}

async function get_blogs_of_tag(tag){
    let temp = await tag.getBlogs();
    let result = new Array();
    let author = await author_controller.get_author_details();
    for (let obj of temp){   
        result.push({
            title: obj.title,
            shortDescription: obj.shortDescription,
            image: obj.image,
            id: obj.id,
            createdAt: obj.createdAt,
            firstName: author.firstName,
            lastName: author.lastName,
        });
    }
    return result;
}

module.exports = {
    get_all_tags,
    get_tag,
    get_blogs_of_tag,
};