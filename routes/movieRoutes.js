const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { validateMovie } = require('../middleware/validate');
const { ensureAuthenticated } = require('../middleware/auth');
/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API for Hallmark movie ratings
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
// GET all movies
router.get('/', movieController.getAll);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a single movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: The movie object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Movie not found
 */
// GET a single movie
router.get('/:id', movieController.getSingle);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Validation failed
 */
// POST create a movie
router.post('/', ensureAuthenticated, validateMovie, movieController.createMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update an existing movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       204:
 *         description: Movie updated successfully
 *       400:
 *         description: Validation failed or invalid ID
 *       404:
 *         description: Movie not found
 */
// PUT update a movie
router.put('/:id', ensureAuthenticated, validateMovie, movieController.updateMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Movie not found
 */
// DELETE a movie
router.delete('/:id', ensureAuthenticated, movieController.deleteMovie);

module.exports = router;