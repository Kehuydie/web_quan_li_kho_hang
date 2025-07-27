const { Sequelize, DataTypes } = require('sequelize');
const {sequelize}= require('../config/dbconnect')

const ExportOrder = sequelize.define('ExportOrder', {
  export_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  customer_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  customer_phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  export_date: {
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
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'Export_Orders',
  timestamps: false
});

module.exports=ExportOrder