'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Comment.belongsTo(models.Blog, {
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
			Comment.hasOne(models.Comment, {
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
		}
	}
	Comment.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			validate: {
				checkLength: function(){
					if (this.getDataValue('name').length < 1){
						throw new Error('Message cannot be empty');
					}
				}
			}
		},
		email: {
			type: DataTypes.STRING(200),
			allowNull: false,			
			validate: {
				checkLength: function(){
					if (this.getDataValue('email').length < 1){
						throw new Error('Message cannot be empty');
					}
				},
				validateEmail:	function validateEmail(email) {
					const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
				  	return emailRegex.test(email);
				}
			}
		},
		message: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			validate: {
				checkLength: function(){
					if (this.getDataValue('message').length < 1){
						throw new Error('Message cannot be empty');
					}
				}
			}
		},
		website: {
			type: DataTypes.STRING(1000),
			allowNull: false,
		},
	}, {
		sequelize,
		freezeTableName: true,
	});
	return Comment;
};