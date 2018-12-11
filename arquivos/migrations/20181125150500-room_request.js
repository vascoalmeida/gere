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
            stauts: {
                allowNull: false,
                type: Sequelize.TIME,
            },
            room_id: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: "Rooms",
                    key: "id",
                    as: "room_id",
                },
            },
            user_id: {
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