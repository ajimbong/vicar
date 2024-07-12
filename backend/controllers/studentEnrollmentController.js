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

exports.getStudentCourses = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await db.Student.findByPk(id, {
      include: [
        {
          model: db.Course,
          through: db.StudentEnrollment,
          as: "courses",
        },
      ],
    });
// const [results, metadata] = await db.sequelize.query(
//   `
//   SELECT c.* 
//   FROM Courses c
//   JOIN StudentEnrollments se ON c.id = se.course_id
//   WHERE se.student_id = :student_id
// `,
//   {
//     replacements: { student_id: id },
//     type: db.sequelize.QueryTypes.SELECT,
//   }
// );
// console.log(results);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student.courses);
  } catch (error) {
    next(error);
  }
};
