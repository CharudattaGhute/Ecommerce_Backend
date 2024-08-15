const express = require("express");
const router = express.Router();

const {
  addcategory,
  getcategory,
  updatecategory,
  deletecategory,
} = require("../controller/categorycontroller");

router.post("/addcategory", addcategory);
router.get("/getcategory", getcategory);
router.put("/updatecategory/:id", updatecategory);
router.delete("/deletecategory/:id", deletecategory);
module.exports = router;
