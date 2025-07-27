const { Sequelize, DataTypes } = require('sequelize');
const {sequelize}= require('../config/dbconnect')

const Category = sequelize.define('Category', {
  category_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  category_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'Categories', 
  timestamps: false         
});

module.exports = Category;