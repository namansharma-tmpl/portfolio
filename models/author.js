'use strict';
const {
	Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
	class Author extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Author.hasMany(models.Blog);
			Author.hasMany(models.Project);			
		}
	}
	Author.init({
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		email: {			
			type: DataTypes.STRING(400),
			allowNull: false,
			unique: true,
			validate: {
				validateEmail: function validateEmail(email) {
					const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
				  	return emailRegex.test(email);
				}
			}
		},
		firstName: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING(70),
			allowNull: false,
		},
		subTitle: {
			type: DataTypes.STRING(70),
			allowNull: false,
			defaultValue: '',
		},
		description: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			defaultValue: '',
		},
		profilePic: {
			type: DataTypes.STRING(1000),
		},
		skillSet: {
			type: DataTypes.JSONB,
			allowNull: false,
			defaultValue: '',
		},
		skillDescription: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			defaultValue: '',
		},
		cvFile: {
			type: DataTypes.STRING(1000),
		},
		facebook: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			defaultValue: '',
		},
		instagram: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			defaultValue: '',
		},
		twitter: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			defaultValue: '',
		}
	}, {
		sequelize,
		freezeTableName: true,
	});	
	return Author;
};