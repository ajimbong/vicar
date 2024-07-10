const db = require("../models");
const Student = db.Student;
const StudentEnrollment = db.StudentEnrollment;

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.enrollStudent = async (req, res) => {
  try {
    const { student_id, course_id } = req.body;
    const enrollment = await StudentEnrollment.create({
      student_id,
      course_id,
    });
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEnrollmentsByStudentId = async (req, res) => {
  try {
    const enrollments = await StudentEnrollment.findAll({
      where: { student_id: req.params.id },
    });
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStudentEnrollments = async (req, res, next) => {
  try {
    const enrollments = await db.StudentEnrollment.findAll({
      where: { student_id: req.params.id },
      include: [db.Course],
    });
    res.status(200).json(enrollments);
  } catch (error) {
    next(error);
  }
};

// controllers/studentEnrollmentController.js

exports.deleteEnrollment = async (req, res, next) => {
    try {
        const { student_id, course_id } = req.body;
        const enrollment = await db.StudentEnrollment.findOne({ where: { student_id, course_id } });
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        await enrollment.destroy();
        res.status(200).json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
        next(error);
    }
};
