const mongoose = require("mongoose");

const categorymodel = require("../Module/category");

// **********************************************
// Add Category
async function addcategory(req, res) {
  console.log(req.body);
  const userid = req.user._id;
  const { categoryname, createdBy } = req.body;
  try {
    const existingcategory = await categorymodel.findOne({ categoryname });
    if (existingcategory) {
      return res.status(400).json({ message: "Category Already Exists" });
    } else {
      const newcategory = new categorymodel({
        categoryname,
        createdBy: userid,
        createdAt: Date.now(),
      });
      await newcategory.save();
      res.status(201).json({ message: "Category Added Sucessfully" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// ******************************************
// Get all category by id
async function getcategorybyid(req, res) {
  console.log(req.body);
  const { id } = req.params;
  try {
    const category = await categorymodel.findById(id);
    console.log(id);
    if (!category) {
      res.status(404).send({ msg: "category id is not found" });
    }
    return res.status(201).send({ categoryname: category.categoryname });
  } catch (error) {
    res.status(500).send(error);
  }
}

// *******************************************
// Get all category
async function getcategory(req, res) {
  try {
    const category = await categorymodel.find();
    res.status(201).send({ category: category });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// ************************************************
// Delete Category
async function deletecategory(req, res) {
  console.log(req.body);
  const { id } = req.params;
  try {
    const category = await categorymodel.findByIdAndDelete(id);
    if (!category) {
      res.status(404).json({ message: "Category Not Found" });
    }
    res.status(201).json({ message: "Category Deleted Sucessfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// *************************************************
// Update category
async function updatecategory(req, res) {
  console.log(req.body);
  const { categoryname, createdBy } = req.body;
  const { id } = req.params;

  try {
    const category = await categorymodel.findByIdAndUpdate(id);
    if (!category) {
      res.status(404).json({ message: "Category Not Found" });
    }
    category.categoryname = categoryname || category.categoryname;
    category.createdBy = createdBy || category.createdBy;
    await category.save();
    res.status(201).send({ message: "Category Updated Sucessfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  addcategory,
  getcategorybyid,
  getcategory,
  updatecategory,
  deletecategory,
};
