const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Cart = sequalize.define("cart", {});

module.exports = Cart;