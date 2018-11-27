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
            purpose: {
                type: Sequelize.STRING,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Rooms");
    }
}