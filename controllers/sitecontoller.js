const Product=require('../models/productmodel')
const Categorie=require('../models/categorymodel')

function site(req,res){
    res.render('site-home', { title: "trang chu" }); 
}; 

async function showproduct(req,res){
    const getproduct = await Product.findAll();
    const getcategory = await Categorie.findAll();
    res.render('product.pug', { 
        title: "danh sach san pham" ,
        getproduct:getproduct,
        getcategory:getcategory
    }); 
}

async function createproduct(req,res){
    try {
    await Product.create({
      product_name: req.body.productName,
      description: req.body.description,
      category_id: req.body.category_id,
      unit: req.body.unit,
      import_price: req.body.import_price,
      sell_price: req.body.sell_price,
      stock_quantity: 0,
      min_stock: 0,
      created_date: new Date(),
      status: req.body.status
    });
    res.redirect('/product'); // hoặc về trang danh sách
  } catch (err) {
    res.status(500).send("Lỗi khi thêm sản phẩm: " + err.message);
  }
}

async function deleteproduct(req,res){
    const productId = req.params.id;

    try {
        await Product.destroy({
            where: { product_id: productId }
        });
        res.redirect('/product');
    } catch (error) {
        res.status(500).send('Lỗi khi xoá sản phẩm: ' + error.message);
    }
}; 

async function updateproduct(req,res){
    const productId = req.params.id;

    try {
        const { product_name, description, category_id, unit, import_price, sell_price, status } = req.body;

        await Product.update(
            {
                product_name,
                description,
                category_id,
                unit,
                import_price,
                sell_price,
                status
            },
            {
                where: { product_id: productId }
            }
        );

        res.redirect('/product');
    } catch (err) {
        console.error("Lỗi khi cập nhật sản phẩm:", err);
        res.status(500).send("Lỗi khi cập nhật sản phẩm: " + err.message);
    }
}; 

module.exports={
    updateproduct,
    deleteproduct,
    showproduct,
    createproduct
}