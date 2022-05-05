const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const db = new Sequelize({
  dialect: "postgres",
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  logging: false,
  dialectOptions: {
    useUTC: false,
  },
  timezone: "-05:00",
});

module.exports = { db };
