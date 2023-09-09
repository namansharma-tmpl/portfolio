const blog_controller = require('../controllers/blog.controller');
const category_controller = require('../controllers/category.controller');
const tag_controller = require('../controllers/tag.controller');
const comment_controller = require('../controllers/comment.controller');
const author_contoller = require('../controllers/author.controller');
const comment = require('../models/comment');



async function get_blogs_by_categories(){
    let categories;
    try {
        categories = await category_controller.get_categories();
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    let result;
    try {
        result = await blog_controller.get_blogs_of_categories(categories);
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }    
    return {status: 200, result};
}

async function get_blogs_by_category(categoryId){
    let result;    
    try {
        let category = await category_controller.get_category(categoryId);
        if (category === null){
            return {status: 404};
        }        
        result = await category_controller.get_blogs_of_category(category);
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }    
    return {status: 200, result};
}

async function get_blogs_by_tag(tagId){
    let result;
    try {
        let tag = await tag_controller.get_tag(tagId);
        if (tag === null){
            return {status: 404};
        }
        result = await tag_controller.get_blogs_of_tag(tag);
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}

async function get_single_blog(blogId){
    let result = {};
    try {        
        result.blog = await blog_controller.get_blog_by_id(blogId);
        if (result.blog === null){
            return {status: 404};
        }
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    try {
        await blog_controller.increment_views(blogId);
        let author = await author_contoller.get_author_details();
        result.author = {
            firstName: author.firstName,
            lastName: author.lastName,
        };
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    try {
        result.prevPost = await blog_controller.get_previous_post(result.blog.createdAt);
        result.nextPost = await blog_controller.get_next_post(result.blog.createdAt);
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}


async function get_comments(blogId){
    let result;
    try {
        let blog = blog_controller.get_blog_by_id(blogId);
        if (blog === null){
            return {status: 404};
        }
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    try {
        result = await comment_controller.get_comments(blogId);
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}



async function get_popular_posts(){
    let result;
    try {
        result = await blog_controller.get_popular_posts();
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}

async function get_suggestions(categoryId){
    categoryId = parseInt(categoryId);
    let result;
    try {
        let category = await category_controller.get_category(categoryId);
        if (category === null){
            return {status: 404};
        }
        result = await blog_controller.get_suggestions(categoryId);
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};
}


async function post_comment(blogId, body){    
    try {
        if (!body.name || !body.message || body.name.length < 1 || body.message.length < 1){
            throw new Error('invalid details');
        }
    }
    catch (err){
        console.log(err);
        return {status: 400};
    }    
    let blog;
    try {
        blog = await blog_controller.get_blog_by_id(blogId);
        if (blog === null){
            return {status :404};
        }
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    let result;
    try {
        let name = body.name;
        let message = body.message;
        let email = 'email' in body && body.email != null? body.email: '';
        let replyTo = 'replyTo' in body && body.replyTo != null? body.replyTo: '';
        result = await comment_controller.create_comment(blog, name, message, email, replyTo);
        delete result.dataValues.updatedAt;
        delete result.dataValues.CommentId;
    }
    catch (err){
        console.log(err);
        return {status: 500};
    }
    return {status: 200, result};

}

module.exports = {
    post_comment,
    get_comments,    
    get_blogs_by_categories,
    get_blogs_by_category,
    get_single_blog,
    get_blogs_by_tag,
    get_popular_posts,
    get_suggestions,
};