// controllers/studentEnrollmentController.js

const db = require("../models");

exports.enrollCourse = async (req, res, next) => {
  try {
    const { student_id, course_id } = req.body;
    const [enrollment, created] = await db.StudentEnrollment.findOrCreate({
      where: { student_id, course_id },
    });

    if (!created) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (error) {
    next(error);
  }
};

exports.deleteEnrollment = async (req, res, next) => {
  try {
    const { student_id, course_id } = req.body;
    const enrollment = await db.StudentEnrollment.findOne({
      where: { student_id, course_id },
    });
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }
    await enrollment.destroy();
    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
