'use strict';
module.exports = (sequelize, DataTypes) => {
	const Material = sequelize.define('Material', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.STRING
		},
		name: {
			type: DataTypes.STRING
		},
		img: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.STRING
		},
		model: {
			type: DataTypes.STRING
		},
		brand: {
			type: DataTypes.STRING
		},
	});

	Material.associate = function(models) {
		// associations can be defined here
	};
	
	return Material;
};