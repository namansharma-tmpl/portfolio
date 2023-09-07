const db = require('../models/index.js');

async function get_author_details(){
    const Author = db['Author'];
    const ans =  await Author.findOne({
        attributes: {            
            exclude: ['updatedAt', 'createdAt', 'id', 'email']
        },
    });
    return ans;
}

module.exports = {
    get_author_details,    
}