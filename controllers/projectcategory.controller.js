const db = require('../models/index');

async function get_project_categories(){
    return await db.ProjectCategory.findAll({
        attributes: {
            include: ['id', 'value'],
        }
    })
}

module.exports = {
    get_project_categories,
}