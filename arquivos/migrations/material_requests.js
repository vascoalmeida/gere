module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("material_requests", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            img: {
                type: Sequelize.STRING,
            },
            group_id: {
                type: Sequelize.INTEGER,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("material_requests");
    }
}