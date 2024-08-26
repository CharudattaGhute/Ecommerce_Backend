const mongoose = require("mongoose");
const usermodel = require("../Module/user");
const jwt = require("jsonwebtoken");

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT.SECRET, {
//     expiresIn: "1h",
//   });
// };

// **************************************
// User Added
async function register(req, res) {
  console.log(req.body);
  const { username, email, password, mobileNumber, role } = req.body;

  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      const newUser = new usermodel({
        username,
        email,
        password,
        mobileNumber,
        role,
      });

      await newUser.save();

      res
        .status(201)
        .json({ message: "User registered successfully", success: true });
    } else {
      res.status(400).json({ error: "User already exists", success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
}

// ****************************************************
//  User login
async function login(req, res) {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (!user || !(await user.comparepassword(password))) {
      return res.status(400).send({ error: "Invalid Email or Password" });
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, "key", {
      expiresIn: "1h",
    });
    res.status(200).send({ user: user, access: token, success: true });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
}

async function userinfo(req, res) {
  console.log("****", req.user);
  const id = req.user._id;
  try {
    const user = await usermodel.findById(id);
    console.log(user);
    if (!user) {
      res.status(404).send({ msg: "User does not found", success: false });
    } else {
      res.status(201).send({ user: user, success: true });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  register,
  login,
  userinfo,
};
