'use strict';
module.exports = (sequelize, DataTypes) => {

	const User = sequelize.define('User', {
		id: {
			allowNull: false,
			autoIncrement: true,
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		email: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING,
		},
		passwordSalt: {
			type: DataTypes.STRING,
		},
		class: {
			type: DataTypes.STRING,
		},
		status: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		clearanceLvl: {
			type: DataTypes.INTEGER
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		},
	});

	User.associate = function(models) {
		User.hasMany(models.RoomRequest, {
			foreignKey: "user_id",
			as: "user_room_request",
		});
	};

	return User;
};