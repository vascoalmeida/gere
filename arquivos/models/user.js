'use strict';
module.exports = (sequelize, DataTypes) => {

	const User = sequelize.define('User', {
		id: {
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING,
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		year: {
			type: DataTypes.STRING,
		},
		class: {
			type: DataTypes.STRING,
		},
		status: {
			allowNull: false,
			type: DataTypes.STRING,
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