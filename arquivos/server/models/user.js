'use strict';
module.exports = (sequelize, DataTypes) => {

	const User = sequelize.define('User', {
		id: {
			allowNull: false,
			autoIncrement: true,
			type: DataTypes.INTEGER,
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		email: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING,
		},
		passwordSalt: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		class: {
			type: DataTypes.STRING,
		},
		status: {
			allowNull: false,
			type: DataTypes.STRING,
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