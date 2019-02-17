'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			email: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			passwordSalt: {
				type: Sequelize.STRING,
			},
			class: {
				type: Sequelize.STRING,
			},
			status: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			rank: {
				type: Sequelize.INTEGER, 
			},
			rank: {
				type: Sequelize.STRING,
			},
			createdAt: {
				type: Sequelize.DATE,
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Users');
	}
};