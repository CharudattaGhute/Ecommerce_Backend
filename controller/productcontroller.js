const mongoose = require("mongoose");
const productmodule = require("../Module/product");
const categorymodel = require("../Module/category");

async function createproduct(req, res) {
  console.log(req.body);
  const { productname, category, price, available, quantity, createdBy } =
    req.body;

  try {
    const existingCategory = await categorymodel.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }

    const existingProduct = await productmodule.findOne({
      productname,
      category,
    });
    if (existingProduct) {
      return res.status(400).json({ msg: "Product already exists" });
    }

    const newProduct = new productmodule({
      productname,
      category,
      price,
      available,
      quantity,
      createdBy,
      createdAt: Date.now(),
    });

    await newProduct.save();
    res.json({ msg: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

// **********************************************
// Get product
async function getallproduct(req, res) {
  console.log(req.body);
  try {
    const product = await productmodule
      .find()
      .populate("category", "productname");
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send("Server Error", error);
  }
}

//**********************************************/
async function updateproduct(req, res) {
  console.log(req.body);
  const { productname, category, price, available, quantity } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid product ID" });
  }
  try {
    const product = await productmodule.findById(id);
    console.log(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    product.productname = productname || product.productname;
    product.category = category || product.category;
    product.price = price || product.price;
    product.available = available || product.available;
    product.quantity = quantity || product.quantity;
    await product.save();
    res.json({ msg: "Product updated successfully", product });
  } catch (error) {
    res.status(500).send("Server Error", error);
  }
}

async function deleteproduct(req, res) {
  console.log(req.body);
  const { id } = req.params;

  try {
    const product = await productmodule.findByIdAndDelete(id);
    console.log(id);
    if (!product) {
      return res.status(404).send({ msg: "Product not found" });
    }

    res.status(201).send({ msg: "Product Deleted Sucessfully" });
  } catch (error) {
    res.status(500).send("Server Error", error);
  }
}

module.exports = {
  createproduct,
  getallproduct,
  updateproduct,
  deleteproduct,
};
