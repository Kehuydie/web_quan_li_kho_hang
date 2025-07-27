const { Sequelize, DataTypes } = require('sequelize');
const {sequelize}= require('../config/dbconnect')


const ImportOrder = sequelize.define('ImportOrder', {
  import_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: true
    // quan hệ sẽ khai báo ở index.js hoặc file riêng
  },
  import_date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  total_amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'cancelled'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'Import_Orders',
  timestamps: false
});

module.exports=ImportOrder