const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  const bearerword = token.split(" ")[0].trim();
  const bearertoken = token.split(" ")[1];

  if (bearerword !== "Bearer") {
    return res.status(401).send("Access denied. Invalid token format.");
  }

  try {
    const decoded = jwt.verify(bearertoken, "key");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid token.");
  }
};

exports.admin = (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(403).send({ msg: "Access Denied! No user role found." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).send({ msg: "Access Denied! Admins only." });
  }

  next();
};
