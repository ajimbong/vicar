const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /assets:
 *   get:
 *     summary: Get all assets
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: List of assets
 *       400:
 *         description: Error retrieving assets
 */
router.get("/", assetController.getAllAssets);

/**
 * @swagger
 * /assets/{id}:
 *   get:
 *     summary: Get an asset by ID
 *     tags: [Assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Asset ID
 *     responses:
 *       200:
 *         description: Asset details
 *       404:
 *         description: Asset not found
 *       400:
 *         description: Error retrieving asset
 */
router.get("/:id", assetController.getAssetById);

/**
 * @swagger
 * /assets:
 *   post:
 *     summary: Upload a new asset
 *     tags: [Assets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - URL
 *               - lecture_id
 *             properties:
 *               URL:
 *                 type: string
 *               lecture_id:
 *                 type: integer
 *             example:
 *               URL: "https://example.com/3dmodel.glb"
 *               lecture_id: 1
 *     responses:
 *       201:
 *         description: Asset uploaded successfully
 *       400:
 *         description: Error uploading asset
 */
router.post("/", authMiddleware, assetController.createAsset);

/**
 * @swagger
 * /assets/{id}:
 *   put:
 *     summary: Update an asset
 *     tags: [Assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Asset ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               URL:
 *                 type: string
 *               lecture_id:
 *                 type: integer
 *             example:
 *               URL: "https://example.com/3dmodel.glb"
 *               lecture_id: 1
 *     responses:
 *       200:
 *         description: Asset updated successfully
 *       404:
 *         description: Asset not found
 */
router.put('/:id', authMiddleware, assetController.updateAsset);

/**
 * @swagger
 * /assets/{id}:
 *   delete:
 *     summary: Delete an asset
 *     tags: [Assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Asset ID
 *     responses:
 *       200:
 *         description: Asset deleted successfully
 *       404:
 *         description: Asset not found
 */
router.delete('/:id', authMiddleware, assetController.deleteAsset);

module.exports = router;
