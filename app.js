const express = require("express");
const mongoose = require("mongoose");
const productrouter = require("./routes/productRoute");
const userrouter = require("./routes/userRoute");
const categoryrouter = require("./routes/categoryRoutes");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Ecommerce");

const database = mongoose.connection;
database.on("error", (error) => {
  console.log("Error", error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
app.use("/api", productrouter);
app.use("/api/users", userrouter);
app.use("/api/category", categoryrouter);

app.listen(5001, () => {
  console.log("http://localhost:5001");
});
