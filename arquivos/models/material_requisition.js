'use strict';

module.exports = (sequelize, DataTypes) => {
    var material_requisition = sequelize.define('material_requisition', {
        name: DataTypes.STRING,
        img: DataTypes.STRING,
        group_id: DataTypes.INTEGER,
    });

    return material_requisition;
};