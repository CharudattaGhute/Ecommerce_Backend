const mongoose = require("mongoose");
const productmodule = require("../Module/product");
const categorymodel = require("../Module/category");

// *****************************************
// Added Product
async function createproduct(req, res) {
  console.log(req.body);
  const { productname, category, price, available, quantity, createdBy } =
    req.body;
  const image = req.file ? req.file.filename : null;

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
      image,
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
// *********************************************
// get product by id

async function getproductbyid(req, res) {
  console.log(req.body);
  const { id } = req.params;
  try {
    const product = await productmodule.findById(id);
    console.log(id);
    if (!product) {
      res.status(404).send({ msg: "Product id is not found" });
    }
    return res.status(201).send({ msg: "This is product", product });
  } catch (error) {
    res.status(500).send(error);
  }
}

// **********************************************
// Get product With Auth
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
// Updated Product
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

// ******************************************
// Delete Product
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
  getproductbyid,
  getallproduct,
  updateproduct,
  deleteproduct,
};
