const tag_controller = require('../controllers/tag.controller');

async function get_all_tags(){
    let result;
    try {
        result = await tag_controller.get_all_tags();
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}

module.exports = {
    get_all_tags,
}