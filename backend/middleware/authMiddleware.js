const jwt = require("jsonwebtoken");
const dotenv = require("../config/dotenv");
const db = require("../models");
const Lecturer = db.Lecturer;
const Student = db.Student;

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, dotenv.jwtSecret);
    const user =
      (await Lecturer.findByPk(decoded.id)) ||
      (await Student.findByPk(decoded.id));

    if (!user) {
      return res.status(401).json({ error: "Invalid token." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
