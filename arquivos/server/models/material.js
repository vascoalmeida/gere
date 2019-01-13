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
			allowNull: false,
			type: DataTypes.STRING
		},
		img: {
			allowNull: false,
			type: DataTypes.STRING
		},
		description: {
			allowNull: false,
			type: DataTypes.STRING
		},
		model: {
			type: DataTypes.STRING
		},
		brand: {
			type: DataTypes.STRING
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		},
	});

	Material.associate = function(models) {
		Material.belongsTo(models.Image, {
			foreignKey: "img_id",
		});
	};
	
	return Material;
};