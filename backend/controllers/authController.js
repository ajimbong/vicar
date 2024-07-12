const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const dotenv = require("../config/dotenv");
const {generateToken} = require("../utils/token")

const Lecturer = db.Lecturer;
const Student = db.Student;

// const generateToken = (user) => {
//   return jwt.sign({ id: user.id, email: user.email }, dotenv.jwtSecret, {
//     expiresIn: "1h",
//   });
// };

exports.registerLecturer = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const lecturer = await Lecturer.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(lecturer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.registerStudent = async (req, res) => {
  try {
    const { first_name, last_name, email, matricule, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      first_name,
      last_name,
      email,
      matricule,
      password: hashedPassword,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await db.Lecturer.findOne({ where: { email } });

    if (!user) {
      user = await db.Student.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    const userData = {
      token,
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    if (user.matricule) {
      userData.matricule = user.matricule;
    }

    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};
