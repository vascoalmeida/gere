module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.createTable("RoomRequests", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER,
            },
            chosen_day: {
                type: sequelize.DATE,
            },
            time_start: {
                type: sequelize.TIME,
            },
            time_end: {
                type: sequelize.TIME,
            },
            roomId: {
                type: sequelize.INTEGER,
                references: {
                    model: "Rooms",
                    key: "id",
                    as: "roomId",
                },
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable("RoomRequests");
    }
}