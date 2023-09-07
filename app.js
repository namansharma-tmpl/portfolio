const path = require('path');
require('dotenv').config({path: path.join(__dirname, 'config', '.env')});
const express = require('express');
const db = require('./models/index');




const app = express();

async function auth_db_conn(){
    try {
        await db.sequelize.authenticate();
    }
    catch (err){
        console.log('An error occured while authenticating connection with database:');
        console.log(err);
        return;
    }
}

auth_db_conn();

const home_routes = require('./routes/home.routes');
const blog_routes = require('./routes/blog.routes');
const category_routes = require('./routes/category.routes');
const tag_routes = require('./routes/tag.routes');
const search_routes = require('./routes/search.routes');
const contact_routes = require('./routes/contact.routes');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

app.use('/api/home', home_routes);
app.use('/api/blogs', blog_routes);
app.use('/api/categories', category_routes);
app.use('/api/tags', tag_routes);
app.use('/api/search', search_routes);
app.use('/api/contact-me', contact_routes);


app.listen(8000);
