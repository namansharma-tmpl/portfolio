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

module.exports = {
    get_comments,
}