const express = require("express");
const router = express.Router();
const lectureController = require("../controllers/lectureController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /lectures:
 *   get:
 *     summary: Get all lectures
 *     tags: [Lectures]
 *     responses:
 *       200:
 *         description: List of lectures
 *       400:
 *         description: Error retrieving lectures
 */
router.get("/", lectureController.getAllLectures);

/**
 * @swagger
 * /lectures/{id}:
 *   get:
 *     summary: Get a lecture by ID
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lecture ID
 *     responses:
 *       200:
 *         description: Lecture details
 *       404:
 *         description: Lecture not found
 *       400:
 *         description: Error retrieving lecture
 */
router.get("/:id", lectureController.getLectureById);

/**
 * @swagger
 * /lectures:
 *   post:
 *     summary: Create a new lecture
 *     tags: [Lectures]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - course_id
 *               - locked
 *             properties:
 *               title:
 *                 type: string
 *               course_id:
 *                 type: integer
 *               locked:
 *                 type: boolean
 *             example:
 *               title: Introduction to Cells
 *               course_id: 1
 *               locked: true
 *     responses:
 *       201:
 *         description: Lecture created successfully
 *       400:
 *         description: Error creating lecture
 */
router.post("/", authMiddleware, lectureController.createLecture);

/**
 * @swagger
 * /lectures/{id}/unlock:
 *   patch:
 *     summary: Unlock a lecture
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lecture ID
 *     responses:
 *       200:
 *         description: Lecture unlocked successfully
 *       404:
 *         description: Lecture not found
 *       400:
 *         description: Error unlocking lecture
 */
router.patch("/:id/unlock", authMiddleware, lectureController.unlockLecture);

/**
 * @swagger
 * /lectures/{id}:
 *   put:
 *     summary: Update a lecture
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lecture ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               course_id:
 *                 type: integer
 *               locked:
 *                 type: boolean
 *             example:
 *               title: Update Title
 *               course_id: 1
 *               locked: true
 *     responses:
 *       200:
 *         description: Lecture updated successfully
 *       404:
 *         description: Lecture not found
 */
router.put('/:id', authMiddleware, lectureController.updateLecture);

/**
 * @swagger
 * /lectures/{id}:
 *   delete:
 *     summary: Delete a lecture
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lecture ID
 *     responses:
 *       200:
 *         description: Lecture deleted successfully
 *       404:
 *         description: Lecture not found
 */
router.delete('/:id', authMiddleware, lectureController.deleteLecture);

module.exports = router;


module.exports = router;
