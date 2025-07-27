const ExportOrders=require('../models/exportordermodel')
const ExportDetails=require('../models/exportdetailmodel')
const Product=require('../models/productmodel')
const Supplier=require('../models/suppliermodel')
const {sequelize}= require('../config/dbconnect')
const { NUMBER } = require('sequelize')


async function showexportorder(req,res){
    const getexportorder = await ExportOrders.findAll();
    const getexportdetail = await ExportDetails.findAll();
    res.render('export.pug', { 
        title: "danh sach phieu xuat" ,
        getexportorder:getexportorder,
        getexportdetail:getexportdetail
    }); 
}; 

async function deleteexportorder(req,res){
    const exportorderId = req.params.id;

    try {
        await ExportDetails.destroy({
            where: { export_id: exportorderId }
        });

        await ExportOrders.destroy({
            where: { export_id: exportorderId }
        });
        res.redirect('/export');
    } catch (error) {
        res.status(500).send('Lỗi khi xoá sản phẩm: ' + error.message);
    }
}; 

async function detail(req,res) {
    const exportorderId = req.params.id;
    const details = await ExportDetails.findAll({
      where: { export_id: exportorderId },
      include: [
        {
          model: Product,
          attributes: ['product_name']  
        }
      ]
    });

    res.json({
      success: true,
      details
    });
}

async function showcreateexport(req,res){
    const getproduct = await Product.findAll();
    const getsupplier = await Supplier.findAll();
    res.render('createexport.pug', { 
        title: "trang tao moi phieu xuat",
        getproduct:getproduct,
        getsupplier:getsupplier
    }); 
}; 

async function addexportorder(req,res){
    const { customer_name,customer_phone, status, note, details } = req.body;
    const detailArray = JSON.parse(details);
    

    const t = await sequelize.transaction();
    
    try {
        const totalAmount = detailArray.reduce((sum, item) => {
        return sum + Number(item.sell_price) * Number(item.stock_quantity);
    }, 0);


    const newOrder = await ExportOrders.create({
      customer_name:customer_name,
      customer_phone:customer_phone,
      total_amount: totalAmount,
      notes: note,
      status: status
    }, { transaction: t });


    for (let item of detailArray) {
      const { product_id, sell_price, stock_quantity } = item;


      await ExportDetails.create({
        export_id: newOrder.export_id,
        product_id,
        quantity: stock_quantity,
        sell_price,
        subtotal:Number(stock_quantity)*Number(sell_price)
      }, { transaction: t });


      await Product.decrement(
        { stock_quantity: Number(stock_quantity) },
        { where: { product_id }, transaction: t }
      );
    }

    await t.commit();
    res.redirect('/export/create');


  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}; 

module.exports={
    addexportorder,
    showcreateexport,
    detail,
    showexportorder,
    deleteexportorder
}