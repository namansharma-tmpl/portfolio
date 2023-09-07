'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Blog extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Blog.belongsTo(models.Author, {
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			Blog.belongsToMany(models.Tag, {
				through: 'BlogTag',
				onDelete: 'CASCADE',  // means when tag is deleted delete the blog-tag row too from blog-tag table
				onUpdate: 'CASCADE',
			});
			Blog.belongsTo(models.Category, {
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE',
			});			
			Blog.hasMany(models.Comment);
		}
	}
	Blog.init({
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: 'My blog',
		}, 
		views: {
			type: DataTypes.BIGINT,
			defaultValue: 0,
			allowNull: false,
		},
		content: {
			type: DataTypes.STRING(9999999), // 7 nines
			allowNull: false,
			defaultValue: '',
		},
		shortDescription: {
			type: DataTypes.STRING(400),
			allowNull: false,
			defaultValue: '',
		},
		image: {
			type: DataTypes.STRING (1000),
			allowNull: false,
		}
	}, {
		sequelize,
		freezeTableName: true,
	});
	return Blog;
};