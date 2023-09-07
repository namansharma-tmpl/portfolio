'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Category.hasMany(models.Blog);
		}
	}
	Category.init({
		id: {			
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		value: {			
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
	}, {
		sequelize,
		freezeTableName: true,
	});
	return Category;
};