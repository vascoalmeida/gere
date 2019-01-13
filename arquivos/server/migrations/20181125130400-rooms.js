module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Rooms", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING
            },
            img: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            img_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
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
        return queryInterface.dropTable("Rooms");
    }
}