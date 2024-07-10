const jwt = require("jsonwebtoken");
const dotenv = require("../config/dotenv");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, dotenv.jwtSecret, {
    expiresIn: "24h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, dotenv.jwtSecret);
};

module.exports = {
  generateToken,
  verifyToken,
};
