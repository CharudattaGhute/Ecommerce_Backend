const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();

const {
  createproduct,
  getallproduct,
  updateproduct,
  deleteproduct,
} = require("../controller/productcontroller");

router.post("/createproduct", createproduct);
router.get("/getallproduct", getallproduct);
router.put("/updateproduct/:id", updateproduct);
router.delete("/deleteproduct/:id", deleteproduct);

module.exports = router;
