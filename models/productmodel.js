const { Sequelize, DataTypes } = require('sequelize');
const {sequelize}= require('../config/dbconnect')

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories', // tên bảng trong DB
      key: 'category_id',
    },
  },
  unit: {
    type: DataTypes.STRING(50),
  },
  import_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01,
    },
  },
  sell_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01,
    },
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  min_stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  created_date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW, // tự động lấy ngày hiện tại
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
}, {
  tableName: 'Products', // đảm bảo trùng tên bảng nếu không để mặc định Sequelize đổi thành số nhiều
  timestamps: false,     // vì bạn dùng created_date thay vì createdAt/updatedAt
});


console.log(Product === sequelize.models.User); // true

module.exports = Product;