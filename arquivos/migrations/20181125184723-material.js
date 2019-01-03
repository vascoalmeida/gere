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
				allowNull: false,
				type: Sequelize.STRING
			},
			img: {
				allowNull: false,
				type: Sequelize.STRING
			},
			description: {
				allowNull: false,
				type: Sequelize.STRING
			},
			model: {
				type: Sequelize.STRING
			},
			brand: {
				type: Sequelize.STRING
			},
			img_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				onDelete: "CASCADE",
				references: {
					model: "Images",
					key: "id",
					as: "img_id",
				},
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
		return queryInterface.dropTable('Materials');
	}
};