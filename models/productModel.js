import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import ProductCategory from './productCategoryModel.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.STRING,
  sku: {
    type: DataTypes.STRING,
    unique: true
  },
  quantity_in_stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  product_image: DataTypes.STRING
}, {
  tableName: 'product',
  timestamps: false
});

// Association with ProductCategory
Product.belongsTo(ProductCategory, {
  foreignKey: 'category_id'
});
ProductCategory.hasMany(Product, {
  foreignKey: 'category_id'
});

export default Product;
