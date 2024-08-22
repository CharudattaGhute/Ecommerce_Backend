const express = require("express");
const authorise = require("../middleware/auth");
const router = express.Router();

const categorycontroller = require("../controller/categorycontroller");

router.post(
  "/addcategory",
  authorise.auth,
  authorise.admin,
  categorycontroller.addcategory
);
router.get("/getcategorybyid/:id", categorycontroller.getcategorybyid);
router.get("/getcategory", authorise.auth, categorycontroller.getcategory);
router.put(
  "/updatecategory/:id",
  authorise.auth,
  authorise.admin,
  categorycontroller.updatecategory
);
router.delete(
  "/deletecategory/:id",
  authorise.admin,
  categorycontroller.deletecategory
);

module.exports = router;
