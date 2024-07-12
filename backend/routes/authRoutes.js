const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  validate,
  registerLecturerValidator,
  registerStudentValidator,
  loginValidator,
} = require("../utils/validator");

/**
 * @swagger
 * /auth/register/lecturer:
 *   post:
 *     summary: Register a new lecturer
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               first_name: John
 *               last_name: Doe
 *               email: john.doe@example.com
 *               password: secret123
 *     responses:
 *       201:
 *         description: Lecturer registered successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/register/lecturer",
  validate(registerLecturerValidator),
  authController.registerLecturer
);

/**
 * @swagger
 * /auth/register/student:
 *   post:
 *     summary: Register a new student
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - matricule
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               matricule:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               first_name: Jane
 *               last_name: Smith
 *               email: jane.smith@example.com
 *               matricule: 12345678
 *               password: secret123
 *     responses:
 *       201:
 *         description: Student registered successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/register/student",
  validate(registerStudentValidator),
  authController.registerStudent
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 id:
 *                   type: integer
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 matricule:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
router.post("/login", validate(loginValidator), authController.login);

module.exports = router;
