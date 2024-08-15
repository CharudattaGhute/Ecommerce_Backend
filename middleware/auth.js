const jwt = require("jsonwebtoken");

const authorise = (req, res, next) => {
  const token = req.header("Authorization");
  const bearerword = token.split(" ")[0].trim();
  const bearertoken = token.split(" ")[1];
  if (bearerword != "Bearer") {
    return res.status(401).send("Acess denied.Invalid token");
  }
  if (!bearertoken) {
    return res.status(401).send("Acess denied. No token Provided");
  }
  try {
    const decoded = jwt.verify(bearertoken, "key");
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};

module.exports = authorise;
