import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import SiteUser from './siteUserModel.js';

const ShoppingCart = sequelize.define('ShoppingCart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'shopping_cart',
  timestamps: false
});

ShoppingCart.belongsTo(SiteUser, { foreignKey: 'user_id' });
SiteUser.hasMany(ShoppingCart, { foreignKey: 'user_id' });

export default ShoppingCart;
