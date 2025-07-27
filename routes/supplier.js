const express = require('express');
const router = express.Router();

const suppliercontroller= require("../controllers/suppliercontroller")

router.get("/",suppliercontroller.showsupplier)

router.post("/add",suppliercontroller.createsupplier)

router.delete("/:id/delete",suppliercontroller.deletesupplier)

router.put("/:id/update",suppliercontroller.updatesupplier)

module.exports= router
