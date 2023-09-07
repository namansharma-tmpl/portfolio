'use strict';

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
		const obj = { 
			"Html & Css": 95,
			"Javascript": 75,
			"PHP": 80,
			"WordPress": 95,
			"Laravel": 50,
		};		
		await queryInterface.bulkInsert('Author', [{
			// id: 1,
			firstName: 'Saikat',
			lastName: 'Mondal',
			email: 'saikat@gmail.com',
			title: 'Web developer & designer',
			subTitle: 'Practicing development since 2018',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
Phasellus vitae quam sit amet lacus mollis rutrum. Vestibulum anteipsum \
primis in faucibus orci luctus et ultrices posuere cubilia curae.',
			skillSet: JSON.stringify(obj),
			skillDescription: 'Sed consequat ex quis mattis scelerisque. Maecenas nec tellus \
lacinia enim maximus suscipit ac nec ante. Sed cursus quam vel finibus imperdiet',
			profilePic: 'https://i.pinimg.com/originals/85/a1/41/85a141abeb4c84cad5c24128b3cddce7.jpg',
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


// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae quam sit amet lacus mollis rutrum. Vestibulum anteipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
// 'Sed consequat ex quis mattis scelerisque. Maecenas nec tellus lacinia enim maximus suscipit ac nec ante. Sed cursus quam vel finibus imperdiet'