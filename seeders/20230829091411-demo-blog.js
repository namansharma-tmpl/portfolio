'use strict';

const crypto = require('crypto');
// console.log(crypto.randomUUID());

const { UUID, UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
		await queryInterface.bulkInsert('Blog', [{
			id: crypto.randomUUID(),
			title: 'Lorem ipsum',
			content: 'Lorem ipsum',
			shortDescription: 'Lorem ipsum',
			createdAt: new Date(),
			updatedAt: new Date(),
		}]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
};


// npx sequelize-cli db:seed --seed my-seeder-file.js
// npx sequelize-cli seed:generate --name demo-blog