const express = require("express");
const jwt = require("jsonwebtoken");
const authorise = require("../middleware/auth");
const router = express.Router();

const productcontroller = require("../controller/productcontroller");
const upload = require("../middleware/multer");

router.post(
  "/createproduct",
  authorise.auth,
  authorise.admin,
  upload.single("image"),
  productcontroller.createproduct
);
router.get("/getallproduct", authorise.auth, productcontroller.getallproduct);
router.get("/getproductbyid/:id", productcontroller.getproductbyid);
router.put("/updateproduct/:id", productcontroller.updateproduct);
router.delete("/deleteproduct/:id", productcontroller.deleteproduct);

module.exports = router;
