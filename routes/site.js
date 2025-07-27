const express = require('express');
const router = express.Router();

const sitecontroller= require("../controllers/sitecontoller")

router.get("/",sitecontroller.showproduct)

router.post("/add",sitecontroller.createproduct)

router.delete("/:id/delete",sitecontroller.deleteproduct)

router.put("/:id/update",sitecontroller.updateproduct)

module.exports= router
