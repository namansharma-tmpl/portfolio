'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
// 	host: process.env.DB_HOST,
// 	dialect: process.env.DIALECT,/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });

const sequelize = new Sequelize('postgres://admin:YmeztdkjOOnnX7xCRj3J8hHwuAjof4go@dpg-cjk9j3uphtvs739gt190-a.singapore-postgres.render.com/mydb_raz6?ssl=true');

// const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
// 	host: process.env.HOST,
// 	dialect: process.env.DIALECT,/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });


fs
	.readdirSync(__dirname)
	.filter(file => {
		return (
		file.indexOf('.') !== 0 &&
		file !== basename &&
		file.slice(-3) === '.js' &&
		file.indexOf('.test.js') === -1 && file != 'main.js'
		);
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

async function sync_db(){
	await sequelize.sync({alter: true});
}

// sync_db();
// console.log('sync completed');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;