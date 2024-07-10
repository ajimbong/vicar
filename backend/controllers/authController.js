const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const dotenv = require("../config/dotenv");

const Lecturer = db.Lecturer;
const Student = db.Student;

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, dotenv.jwtSecret, {
    expiresIn: "1h",
  });
};

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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user =
      (await Lecturer.findOne({ where: { email } })) ||
      (await Student.findOne({ where: { email } }));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
