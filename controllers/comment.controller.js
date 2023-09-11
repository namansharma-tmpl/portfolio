const db = require('../models/index');
const {Op} = require('sequelize');

async function get_comments(blogId){
    let comments = await db.Comment.findAll({
        where: {
            BlogId: blogId,
            CommentId: null,
        },
        attributes: {
            exclude: ['updatedAt', 'email', 'website', 'BlogId', 'CommentId'],
        }
    });
    for (let comment of comments){
        let replies = await db.Comment.findAll({
            where: {
                CommentId: comment.id,
            },
            attributes: {
                exclude: ['updatedAt', 'id', 'email', 'website', 'BlogId', 'CommentId'],
            }
        });
        comment.dataValues.replies = replies;
        delete comment.dataValues.id;
    }
    return comments;
}
async function get_comment(commentId){
    await db.Comment.findByPk(commentId);
}

async function check_reply_exists(commentId){
    let comment = db.Comment.findByPk(commentId);
    if (comment.CommentId !== null){
        return false;
    }    
    return true;
}

async function create_comment(blog, name, message, email, CommentId){
    let comment = await db.Comment.create({
        BlogId: blog.id,
        name,
        message,
        email,
        CommentId: (CommentId? CommentId: null),
    });
    return comment;
}

module.exports = {
    get_comment,
    create_comment,
    check_reply_exists,
    get_comments,
}