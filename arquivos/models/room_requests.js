"use strict";

module.exports = (sequelize, DataTypes) => {
    var RoomRequest = sequelize.define("RoomRequest", {
        chosen_day: DataTypes.DATE,
        time_start: DataTypes.TIME,
        time_end: DataTypes.TIME,
    });

    RoomRequest.associate = function(models) {
        RoomRequest.belongsTo(models.Room, {
            foreignKey: "roomId",
        });
    }
    
    return RoomRequest;
}