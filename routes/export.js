const express = require('express');
const router = express.Router();

const exportcontroller= require("../controllers/exportcontroller")

router.get("/",exportcontroller.showexportorder)

router.get("/create",exportcontroller.showcreateexport)

router.post("/add",exportcontroller.addexportorder)

router.delete("/:id/delete",exportcontroller.deleteexportorder)

router.get("/:id/details",exportcontroller.detail)

// router.put("/:id/update",suppliercontroller.updatesupplier)

module.exports= router