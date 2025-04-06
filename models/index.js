import Sequelize from "sequelize";
import sequelize from "../config/database.js";

// Import each model
import SiteUser from "./siteUserModel.js";
import ProductCategory from "./productCategoryModel.js";
import Product from "./productModel.js";
import ShoppingCart from "./shoppingcartModel.js";
import ShoppingCartItem from "./shoppingcartitemModel.js";
import ShopOrder from "./shopOrderModel.js";
import OrderLine from "./orderLineModel.js";


Product.belongsTo(ProductCategory, {
  foreignKey: 'category_id',
});
ProductCategory.hasMany(Product, {
  foreignKey: 'category_id',
});

ShoppingCart.belongsTo(SiteUser, {
  foreignKey: 'user_id',
});
SiteUser.hasMany(ShoppingCart, {
  foreignKey: 'user_id',
});

ShoppingCartItem.belongsTo(ShoppingCart, {
  foreignKey: 'cart_id',
});
ShoppingCart.hasMany(ShoppingCartItem, {
  foreignKey: 'cart_id',
});

ShoppingCartItem.belongsTo(Product, {
  foreignKey: 'product_id',
});
Product.hasMany(ShoppingCartItem, {
  foreignKey: 'product_id',
});

ShopOrder.belongsTo(SiteUser, {
  foreignKey: 'user_id',
});
SiteUser.hasMany(ShopOrder, {
  foreignKey: 'user_id',
});

OrderLine.belongsTo(ShopOrder, {
  foreignKey: 'order_id',
});
ShopOrder.hasMany(OrderLine, {
  foreignKey: 'order_id',
});

OrderLine.belongsTo(Product, {
  foreignKey: 'product_id',
});
Product.hasMany(OrderLine, {
  foreignKey: 'product_id',
});

const db = {
  sequelize,
  Sequelize,
  SiteUser,
  ProductCategory,
  Product,
  ShoppingCart,
  ShoppingCartItem,
  ShopOrder,
  OrderLine,
};

export default db;
