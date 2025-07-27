const express = require('express')
const methodOverride = require('method-override');
const routes=require('./routes/index.js')
const data=require('./config/dbconnect.js')
const Product=require('./models/productmodel.js')
const Category=require('./models/categorymodel.js')
const Supplier=require('./models/suppliermodel.js')
const ImportOrder=require('./models/importordermodel.js')
const ImportDetail=require('./models/importdetailmodel.js')
const ExportDetail=require('./models/exportdetailmodel.js')
const ExportOrder=require('./models/exportordermodel.js')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
// public
app.use(express.static("public"))
//
// override
app.use(methodOverride('_method'));
//
//pug
app.set('view engine', 'pug');
app.set('views', './views'); 
//

// data.connect()

// routes(app)

// Product.sync({ alter: true });   

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`)
// })

async function startServer() {
  try {
    await data.connect();

    // Khai báo quan hệ
    Category.hasMany(Product, { foreignKey: 'category_id' });
    Product.belongsTo(Category, { foreignKey: 'category_id' });
    Supplier.hasMany(ImportOrder, { foreignKey: 'supplier_id' });
    ImportOrder.belongsTo(Supplier, { foreignKey: 'supplier_id' });
    Product.hasMany(ImportDetail, { foreignKey: 'product_id' });
    ImportDetail.belongsTo(Product, { foreignKey: 'product_id' });
    ExportDetail.belongsTo(Product, { foreignKey: 'product_id' });
    Product.hasMany(ExportDetail, { foreignKey: 'product_id' });
    ImportOrder.belongsToMany(Product, {
      through: ImportDetail,
      foreignKey: 'import_id',
      otherKey: 'product_id'
    });
    Product.belongsToMany(ImportOrder, {
      through: ImportDetail,
      foreignKey: 'product_id',
      otherKey: 'import_id'
    });
    ExportOrder.belongsToMany(Product, {
      through: ExportDetail,
      foreignKey: 'export_id',
      otherKey: 'product_id'
    });
    Product.belongsToMany(ExportOrder, {
      through: ExportDetail,
      foreignKey: 'product_id',
      otherKey: 'export_id'
    });
    


    // Đồng bộ bảng
    await Category.sync()
    await Product.sync({ alter: true });
    await Supplier.sync();
    await ImportOrder.sync();
    await ImportDetail.sync();
    await ExportOrder.sync();
    await ExportDetail.sync();
  
  const [results] = await data.sequelize.query("SHOW TABLES");
  console.log(results);

    // Routes
    routes(app);

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

startServer();