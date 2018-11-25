"use strict";

module.exports = (sequelize, DataTypes) => {
    var Material = sequelize.define("Material", {
        name: DataTypes.STRING,
        img: DataTypes.STRING,
        description: DataTypes.STRING,
        model: DataTypes.STRING,
        brand: DataTypes.STRING,
    });

    return Material;
}