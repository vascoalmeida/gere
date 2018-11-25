'use strict';

module.exports = (sequelize, DataTypes) => {
    var MaterialRequests = sequelize.define('MaterialRequests', {
        name: DataTypes.STRING,
        img: DataTypes.STRING,
        group_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
    });

    return MaterialRequests;
};