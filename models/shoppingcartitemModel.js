import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import ShoppingCart from './shoppingcartModel.js';
import Product from './productModel.js';

const ShoppingCartItem = sequelize.define('ShoppingCartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'shopping_cart_item',
  timestamps: false
});

ShoppingCartItem.belongsTo(ShoppingCart, { foreignKey: 'cart_id' });
ShoppingCart.hasMany(ShoppingCartItem, { foreignKey: 'cart_id' });

ShoppingCartItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(ShoppingCartItem, { foreignKey: 'product_id' });

export default ShoppingCartItem;
