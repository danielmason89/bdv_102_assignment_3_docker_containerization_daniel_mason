import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import ShopOrder from './shopOrderModel.js';
import Product from './productModel.js';

const OrderLine = sequelize.define('OrderLine', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'order_line',
  timestamps: false
});

OrderLine.belongsTo(ShopOrder, { foreignKey: 'order_id' });
ShopOrder.hasMany(OrderLine, { foreignKey: 'order_id' });

OrderLine.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(OrderLine, { foreignKey: 'product_id' });

export default OrderLine;
