const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const Upload = sequelize.define("Upload", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = Upload;
