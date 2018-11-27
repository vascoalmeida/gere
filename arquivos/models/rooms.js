"use strict";

module.exports = (sequelize, DataTypes) => {
    var Room = sequelize.define("Room", {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        img: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        purpose: {
            type: DataTypes.STRING,
        },
    });

    Room.associate = function(models) {
        Room.hasMany(models.RoomRequest, {
            foreignKey: "roomId",
            as: "roomRequests",
        });
    }

    return Room;
}