const db = require('../models/index.js');

async function get_projects_by_category(categoryId){
    return await db.Project.findAll({
        where: {
            ProjectCategoryId: categoryId,
        },
        attributes: {
            include: ['name', 'link', 'image'],
        }
    });
}

module.exports = {
    get_projects_by_category,
}