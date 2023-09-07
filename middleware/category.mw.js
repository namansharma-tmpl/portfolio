const category_controller = require('../controllers/category.controller');

async function get_all_categories(){
    let result;
    try {
        result = await category_controller.get_categories();
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}

module.exports = {
    get_all_categories,
}