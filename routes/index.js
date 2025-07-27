const siterouter=require('./site')
const supplierroute=require('./supplier')
const importroute=require('./import')
const exportroute=require('./export')

function routes(app){

    app.use("/product",siterouter)

    app.use("/supplier",supplierroute)

    app.use("/import",importroute)

    app.use("/export",exportroute)

};

module.exports=routes