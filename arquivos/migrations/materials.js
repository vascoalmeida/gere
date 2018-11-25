module.exports = {
    up: (queryInterface, sequelize) => {
        return queryInterface.createTable("materials", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER,
            },
            name: {
                type: sequelize.STRING,
            },
            img: {
                type: sequelize.STRING,
            },
            description: {
                type: sequelize.STRING,
            },
            model: {
                type: sequelize.STRING,
            },
            brand: {
                type: sequelize.STRING,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable("materials");
    }
}