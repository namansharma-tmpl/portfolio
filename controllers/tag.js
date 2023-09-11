const db = require('../models/index');
const createError = require('http-errors');

async function tags(req, res, next){
    try {
        let result = await db.Tag.findAll({
            attributes: {
                exclude: ['updatedAt', 'createdAt'],
            }
        });
        res.status(200).json(result);
        return;
    }
    catch (err){
        console.log(err);
        next(createError(500, "Something went wrong"));
        return;
    }
}

module.exports = {
    tags,
}