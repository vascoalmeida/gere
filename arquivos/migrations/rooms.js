module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.createTable("Rooms", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER,
            },
            name: {
                type: sequelize.STRING
            },
            img: {
                type: sequelize.STRING,
            },
            description: {
                type: sequelize.STRING,
            },
            purpose: {
                type: sequelize.STRING,
            }
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable("Rooms");
    }
}