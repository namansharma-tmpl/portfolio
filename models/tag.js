'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Tag extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Tag.belongsToMany(models.Blog, {through: 'BlogTag'});
		}
	}
	Tag.init({
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		value: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		}
	}, {
		sequelize,
		freezeTableName: true,
	});
	return Tag;
};