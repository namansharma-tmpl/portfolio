const blog_controller = require('../controllers/blog.controller');

async function search(query){
    let result;
    query = '%' + query + '%';
    try {        
        result = await blog_controller.search(query);
        if (result.length === 0){
            return {status: 404};
        }
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}

module.exports = {
    search,
}