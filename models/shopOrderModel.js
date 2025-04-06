import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import SiteUser from './siteUserModel.js';

const ShopOrder = sequelize.define('ShopOrder', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  payment_method_id: DataTypes.INTEGER, // or you can define a separate table
  shipping_address_id: DataTypes.INTEGER, // or a separate table
  order_status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  order_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  order_total: {
    type: DataTypes.DECIMAL(10, 2)
  }
}, {
  tableName: 'shop_order',
  timestamps: false
});

ShopOrder.belongsTo(SiteUser, { foreignKey: 'user_id' });
SiteUser.hasMany(ShopOrder, { foreignKey: 'user_id' });

export default ShopOrder;
