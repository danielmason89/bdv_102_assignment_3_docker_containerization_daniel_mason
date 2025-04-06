import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SiteUser = sequelize.define('SiteUser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email_address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'site_user', // match the actual table name in the DB
  timestamps: false
});

export default SiteUser;