const author_controller = require('../controllers/author.controller');
const blog_controller = require('../controllers/blog.controller');
const projectcategory_controller = require('../controllers/projectcategory.controller');
const project_controller = require('../controllers/project.controller');


async function get_project_categories(){
    let result;
    try {
        result = await projectcategory_controller.get_project_categories();
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}


async function get_about_me(){
    let result;
    try {
        result = await author_controller.get_author_details();
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {result, status: 200};
}


async function get_projects_by_category(categoryId){
    if (!categoryId){
        categoryId = 1;
    }
    let result;
    try {
        let project_category_exists = project_controller.check_project_category_exists(categoryId);
        if (!project_category_exists){
            return {status: 404};
        }
        result = await project_controller.get_projects_by_category(categoryId);
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}

async function get_blogs_by_page(pageNo){
    pageNo = parseInt(pageNo);
    if (!pageNo || pageNo < 1){
        return {status: 404};
    }
    let total_blogs;
    try {
        total_blogs = await blog_controller.total_blogs();
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    if (Math.ceil(total_blogs / process.env.BLOGS_PER_PAGE) < pageNo){
        return {status: 404};
    }    
    let result = {};
    try {
        result.blogs = await blog_controller.get_blogs_by_page(pageNo);
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    result.end = Math.ceil(total_blogs / process.env.BLOGS_PER_PAGE) === pageNo? true: false;
    result.maxBlogs = total_blogs;
    result.numberOfBlogsPerPage = process.env.BLOGS_PER_PAGE;
    return {status: 200, result};
}


module.exports = {    
    get_blogs_by_page,
    get_about_me,
    get_project_categories,
    get_projects_by_category,
}