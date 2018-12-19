'use strict';
module.exports = (sequelize, DataTypes) => {

	const Image = sequelize.define('Image', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	Image.associate = function(models) {
		Image.hasMany(models.Room, {
			foreignKey: "img_id",
			as: "img_room",
		});
	};
	
	return Image;
};