'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Project extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Project.belongsTo(models.Author, {
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
			Project.belongsTo(models.ProjectCategory);
		}
	}
	Project.init({
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: 'My project',
		},
		link: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			defaultValue: '',
		},
		description: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			defaultValue: '',
		},
		image: {
			type: DataTypes.STRING(1000),
			allowNull: false,
		}
	}, {
		sequelize,
		freezeTableName: true,
	});
	return Project;
};