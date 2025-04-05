import { Sequelize } from "sequelize";

const sequalize = new Sequelize("swiftcart-database", "root", "password", {
    host: "localhost",
    dialect: "postgres",
});

module.exports = sequalize;