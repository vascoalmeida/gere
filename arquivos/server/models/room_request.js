"use strict";

module.exports = (sequelize, DataTypes) => {
    var RoomRequest = sequelize.define("RoomRequest", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        day: {
            type: DataTypes.DATE,
        },
        time_start: {
            type: DataTypes.TIME,
        },
        time_end: {
            type: DataTypes.TIME,
        },
        status: {
            type: DataTypes.STRING,
        },
        createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		},
    });

    RoomRequest.associate = function(models) {
        RoomRequest.belongsTo(models.Room, {
            foreignKey: "room_id",
        });

        RoomRequest.belongsTo(models.User, {
            foreignKey: "user_id",
        });
    }
    
    return RoomRequest;
}