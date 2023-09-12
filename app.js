const path = require('path');
require('dotenv').config();
const express = require('express');
const db = require('./models/index');
const app = express();
const configs = require('./config/routes');
const cors = require('cors');

async function authDbConn(){
    try {
        await db.sequelize.authenticate();
    }
    catch (err){
        console.log('An error occured while authenticating connection with database:');
        console.log(err);
        return;
    }
}

authDbConn();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded

configs(app);

app.listen(8000);
