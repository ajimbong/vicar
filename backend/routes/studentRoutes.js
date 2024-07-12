const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const studentEnrollmentController = require("../controllers/studentEnrollmentController");
const authMiddleware = require("../middleware/authMiddleware");
const { validate, studentEnrollmentValidator } = require("../utils/validator");

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 *       400:
 *         description: Error retrieving students
 */
router.get("/", authMiddleware, studentController.getAllStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student details
 *       404:
 *         description: Student not found
 *       400:
 *         description: Error retrieving student
 */
router.get("/:id", authMiddleware, studentController.getStudentById);

/**
 * @swagger
 * /students/{id}/enrollments:
 *   get:
 *     summary: Get all enrollments of a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: List of enrollments
 *       404:
 *         description: Student not found
 *       400:
 *         description: Error retrieving enrollments
 */
router.get(
  "/:id/enrollments",
  authMiddleware,
  studentController.getStudentEnrollments
);

/**
 * @swagger
 * /students/enrollment:
 *   post:
 *     summary: Enroll a student in a course
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - course_id
 *             properties:
 *               student_id:
 *                 type: integer
 *               course_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Enrolled successfully
 *       400:
 *         description: Already enrolled
 */
router.post('/enrollment', authMiddleware, validate(studentEnrollmentValidator), studentEnrollmentController.enrollCourse);

/**
 * @swagger
 * /students/enrollment:
 *   delete:
 *     summary: Delete a student's enrollment
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - course_id
 *             properties:
 *               student_id:
 *                 type: integer
 *               course_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Enrollment deleted successfully
 *       404:
 *         description: Enrollment not found
 */
router.delete('/enrollment', authMiddleware, validate(studentEnrollmentValidator), studentEnrollmentController.deleteEnrollment);

/**
 * @swagger
 * /students/{id}/courses:
 *   get:
 *     summary: Get all courses a student is enrolled in
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: List of courses
 *       404:
 *         description: Student not found
 */
router.get('/:id/courses', authMiddleware, studentEnrollmentController.getStudentCourses);

module.exports = router;
