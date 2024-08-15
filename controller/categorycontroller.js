const mongoose = require("mongoose");
const categorymodel = require("../Module/category");

async function addcategory(req, res) {
  console.log(req.body);
  const { categoryname, createdBy } = req.body;
  try {
    const existingcategory = await categorymodel.findOne({ categoryname });
    if (existingcategory) {
      return res.status(400).json({ message: "Category Already Exists" });
    } else {
      const newcategory = new categorymodel({
        categoryname,
        createdBy,
        createdAt: Date.now(),
      });
      await newcategory.save();
      res.status(201).json({ message: "Category Added Sucessfully" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getcategory(req, res) {
  console.log(req.body);
  try {
    const category = await categorymodel.find();
    res.status(201).send({ message: "This is all product", category });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

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
  getcategory,
  updatecategory,
  deletecategory,
};
