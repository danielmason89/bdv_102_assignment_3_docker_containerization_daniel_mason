import Sequelize from "sequelize";
import sequelize  from "../util/database";

const Cart = sequalize.define("cart", {});

module.exports = Cart;