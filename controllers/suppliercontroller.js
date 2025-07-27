const Supplier=require('../models/suppliermodel')

function home(req,res){
    res.render('supplier.pug', { title: "Nha cung cap" }); 
}; 

async function showsupplier(req,res){
    const getsupplier = await Supplier.findAll();
    res.render('supplier.pug', { 
        title: "danh sach nha cung cap" ,
        getsupplier:getsupplier
    }); 
}; 

async function createsupplier(req,res){
    try {
        await Supplier.create({
            company_name: req.body.company_name,
            contact_person: req.body.contact_person,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            tax_code:req.body.tax_code,
            status: req.body.status
        });
        res.redirect('/supplier'); // hoặc về trang danh sách
    } catch (err) {
        res.status(500).send("Lỗi khi thêm sản phẩm: " + err.message);
    }
}

async function deletesupplier(req,res){
    const supplierId = req.params.id;

    try {
        await Supplier.destroy({
            where: { supplier_id: supplierId }
        });
        res.redirect('/supplier');
    } catch (error) {
        res.status(500).send('Lỗi khi xoá nha cung cap: ' + error.message);
    }
}; 

async function updatesupplier(req,res){
    const supplierId = req.params.id;

    try {
        const { company_name, contact_person, phone, email, address, tax_code, status } = req.body;

        await Supplier.update(
            {
                company_name, 
                contact_person, 
                phone, 
                email, 
                address, 
                tax_code,
                status
            },
            {
                where: { supplier_id: supplierId }
            }
        );

        res.redirect('/supplier');
    } catch (err) {
        console.error("Lỗi khi cập nhật nha cung cap:", err);
        res.status(500).send("Lỗi khi cập nhật nha cung cap: " + err.message);
    }
}; 

module.exports={
    updatesupplier,
    deletesupplier,
    createsupplier,
    showsupplier,
    home
}