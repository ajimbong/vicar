const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

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

module.exports = router;
