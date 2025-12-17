const express = require('express');
const router = express.Router();
const bingoController = require('../controllers/bingoController');
const { validatePrompt } = require('../helpers/validatePrompt');
const { ensureAuthenticated } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: BingoPrompts
 *   description: API for Christmas movie bingo prompts
 */

/**
 * @swagger
 * /api/bingo:
 *   get:
 *     summary: Get all bingo prompts
 *     tags: [BingoPrompts]
 *     responses:
 *       200:
 *         description: List of bingo prompts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BingoPrompt'
 */
router.get('/', bingoController.getAll);

/**
 * @swagger
 * /api/bingo/{id}:
 *   get:
 *     summary: Get a single bingo prompt by ID
 *     tags: [BingoPrompts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the bingo prompt
 *     responses:
 *       200:
 *         description: The bingo prompt object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BingoPrompt'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Prompt not found
 */

router.get('/:id', bingoController.getSingle);

/**
 * @swagger
 * /api/bingo:
 *   post:
 *     summary: Create a new bingo prompt
 *     tags: [BingoPrompts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BingoPrompt'
 *     responses:
 *       201:
 *         description: Bingo prompt created successfully
 *       400:
 *         description: Validation failed
 */
router.post('/', ensureAuthenticated, validatePrompt, bingoController.create);

/**
 * @swagger
 * /api/bingo/{id}:
 *   put:
 *     summary: Update a bingo prompt
 *     tags: [BingoPrompts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bingo prompt ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BingoPrompt'
 *     responses:
 *       204:
 *         description: Bingo prompt updated successfully
 *       400:
 *         description: Invalid ID or validation failed
 *       404:
 *         description: Bingo prompt not found
 */
router.put('/:id', ensureAuthenticated, validatePrompt, bingoController.update);

/**
 * @swagger
 * /api/bingo/{id}:
 *   delete:
 *     summary: Delete a bingo prompt
 *     tags: [BingoPrompts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bingo prompt ID
 *     responses:
 *       200:
 *         description: Bingo prompt deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Bingo prompt not found
 */
router.delete('/:id', ensureAuthenticated, bingoController.delete);

module.exports = router;

