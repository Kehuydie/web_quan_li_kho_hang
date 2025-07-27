const express = require('express');
const router = express.Router();

const importcontroller= require("../controllers/importcontroller")

router.get("/",importcontroller.showimportorder)

router.get("/create",importcontroller.showcreateimport)

router.post("/add",importcontroller.addimportorder)

router.delete("/:id/delete",importcontroller.deleteimportorder)

router.get("/:id/details",importcontroller.detail)

// router.put("/:id/update",suppliercontroller.updatesupplier)

module.exports= router