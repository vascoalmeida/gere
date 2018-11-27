'use strict';
module.exports = (sequelize, DataTypes) => {
	const RequestMaterial = sequelize.define('RequestMaterial', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		day_start: {
			type: DataTypes.DATE
		},
		day_end: {
			type: DataTypes.DATE
		},
		time_start: {
			type: DataTypes.TIME
		},
		time_end: {
			type: DataTypes.TIME
		},
		status: {
			type: DataTypes.STRING
		},
	});

	RequestMaterial.associate = function(models) {
		RequestMaterial.belongsTo(models.Material, {
			foreignKey: "request_material_id",
			onDelete: "CASCADE",
		});

		RequestMaterial.belongsTo(models.User, {
            foreignKey: "user_id",
            onDelete: "CASCADE",
        });
	};

	return RequestMaterial;
};