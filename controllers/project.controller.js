const db = require('../models/index.js');


async function check_project_category_exists(categoryId){
    let category = db.ProjectCategory.findByPk(categoryId);
    if (category === null){
        return false;
    }
    return true;
}
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
    check_project_category_exists,
    get_projects_by_category,
}