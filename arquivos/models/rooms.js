"use strict";

module.exports = (sequelize, DataTypes) => {
    var Room = sequelize.define("Room", {
        name: DataTypes.STRING,
        img: DataTypes.STRING,
        description: DataTypes.STRING,
        type: DataTypes.STRING,
    });

    Room.associate = function(models) {
        Room.hasMany(models.RoomRequest, {
            foreignKey: "roomId",
            as: "roomRequests",
        });
    }

    return Room;
}