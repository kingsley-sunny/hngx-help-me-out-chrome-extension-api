const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const VideoModel = sequelize.define("Video", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },

  public_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  bytes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  transcript_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  transcript_public_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = VideoModel;
