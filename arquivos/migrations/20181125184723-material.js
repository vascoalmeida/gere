'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Materials', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			img: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.STRING
			},
			model: {
				type: Sequelize.STRING
			},
			brand: {
				type: Sequelize.STRING
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Materials');
	}
};