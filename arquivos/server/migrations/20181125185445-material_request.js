'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('RequestMaterials', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			day_start: {
				type: Sequelize.DATE
			},
			day_end: {
				type: Sequelize.DATE
			},
			time_start: {
				type: Sequelize.TIME
			},
			time_end: {
				type: Sequelize.TIME
			},
			status: {
				type: Sequelize.STRING
			},
			createdAt: {
				type: Sequelize.DATE,
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
			material_id: {
				type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: "Materials",
                    key: "id",
                    as: "material_id",
                },
			},
			user_id: {
				type: Sequelize.STRING,
                onDelete: 'CASCADE',
                references: {
                    model: "Users",
                    key: "email",
                    as: "material_id",
                },
			},
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('RequestMaterials');
	}
};