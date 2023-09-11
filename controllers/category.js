const db = require('../models/index');
const createError = require('http-errors');

async function categories(req, res, next){
    try {
        let result = await db.Category.findAll({
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
    categories,
}