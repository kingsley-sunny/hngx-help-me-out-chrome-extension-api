const { Sequelize } = require("sequelize");

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

module.exports = {
  sequelize: new Sequelize(dbName, dbUsername, dbPassword, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }),
};
