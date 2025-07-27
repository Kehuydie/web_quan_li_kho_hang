const ImportOrders=require('../models/importordermodel')
const ImportDetails=require('../models/importdetailmodel')
const Product=require('../models/productmodel')
const Supplier=require('../models/suppliermodel')
const {sequelize}= require('../config/dbconnect')

function site(req,res){
    res.render('import.pug', { title: "trang chu" }); 
}; 

async function showimportorder(req,res){
    const getimportorder = await ImportOrders.findAll();
    const getimportdetail = await ImportDetails.findAll();
    res.render('import.pug', { 
        title: "danh sach phieu nhap" ,
        getimportorder:getimportorder,
        getimportdetail:getimportdetail
    }); 
}

async function deleteimportorder(req,res){
    const importorderId = req.params.id;

    try {
        await ImportDetails.destroy({
            where: { import_id: importorderId }
        });

        await ImportOrders.destroy({
            where: { import_id: importorderId }
        });
        res.redirect('/import');
    } catch (error) {
        res.status(500).send('Lỗi khi xoá sản phẩm: ' + error.message);
    }
}; 

async function detail(req,res) {
    const importorderId = req.params.id;
    const details = await ImportDetails.findAll({
      where: { import_id: importorderId },
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

async function showcreateimport(req,res){
    const getproduct = await Product.findAll();
    const getsupplier = await Supplier.findAll();
    res.render('createimport.pug', { 
        title: "trang tao moi phieu nhap",
        getproduct:getproduct,
        getsupplier:getsupplier
    }); 
}; 

async function addimportorder(req,res){
    const { companyId, status, note, details } = req.body;
    const detailArray = JSON.parse(details);

    const t = await sequelize.transaction();
    
    try {
        const totalAmount = detailArray.reduce((sum, item) => {
        return sum + Number(item.import_price) * Number(item.stock_quantity);
    }, 0);


    const newOrder = await ImportOrders.create({
      supplier_id: companyId,
      total_amount: totalAmount,
      notes: note,
      status: status
    }, { transaction: t });


    for (let item of detailArray) {
      const { product_id, import_price, stock_quantity } = item;


      await ImportDetails.create({
        import_id: newOrder.import_id,
        product_id,
        quantity: stock_quantity,
        import_price,
        manufacturing_date: new Date(),
        expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      }, { transaction: t });


      await Product.increment(
        { stock_quantity: Number(stock_quantity) },
        { where: { product_id }, transaction: t }
      );
    }

    await t.commit();
    res.redirect('/import/create');


  } catch (err) {
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: "Lỗi khi nhập hàng." });
  }
}; 

module.exports={
    addimportorder,
    showcreateimport,
    detail,
    deleteimportorder,
    showimportorder,
    site
}