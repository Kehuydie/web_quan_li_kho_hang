const { Sequelize, DataTypes } = require('sequelize');
const {sequelize}= require('../config/dbconnect')

const ImportDetail = sequelize.define('ImportDetail', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  import_id: {
    type: DataTypes.INTEGER,
    allowNull: false
    // Khóa ngoại sẽ được định nghĩa bằng association
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  import_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  manufacturing_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  expiry_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'Import_Details',
  timestamps: false
});

module.exports=ImportDetail