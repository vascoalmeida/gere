module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("RoomRequests", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            day: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            time_start: {
                allowNull: false,
                type: Sequelize.TIME,
            },
            time_end: {
                allowNull: false,
                type: Sequelize.TIME,
            },
            status: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            createdAt: {
				type: Sequelize.DATE,
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
            room_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: "Rooms",
                    key: "id",
                    as: "room_id",
                },
            },
            user_id: {
                allowNull: false,
                type: Sequelize.STRING,
                references: {
                    model: "Users",
                    key: "email",
                    as: "user_id",
                },
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("RoomRequests");
    }
}