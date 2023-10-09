const db = require('../models/index');
const createError = require('http-errors');
const redis = require('redis');

let redisClient;

(async () => {
	redisClient = redis.createClient();

	redisClient.on("error", (error) => console.error(`Error : ${error}`));

	await redisClient.connect();
})();

async function categories(req, res, next){
    try {
        let result;
        const cacheResults = await redisClient.get('categories');
        if (cacheResults) {            
            result = JSON.parse(cacheResults);
            res.status(200).json(result);
            return;
        }
        result = await db.Category.findAll({
            attributes: {
                exclude: ['updatedAt', 'createdAt'],
            }
        });
        await redisClient.set('categories', JSON.stringify(result));
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