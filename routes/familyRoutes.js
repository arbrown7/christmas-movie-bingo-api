const express = require('express');
const familyController = require('../controllers/familyController');
const { validateFamilyMember } = require('../middleware/validate');

const router = express.Router();

/**
 * @swagger
 * /api/family:
 *   get:
 *     summary: Get all family members
 *     security:
 *       - googleAuth: []
 *     responses:
 *       200:
 *         description: List of family members
 *       401:
 *         description: Unauthorized
 */
// GET all family members
router.get('/', familyController.getAll);

/**
 * @swagger
 * /api/family/{id}:
 *   get:
 *     summary: Get a family member by ID
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single family member
 *       401:
 *         description: Unauthorized
 */
// GET a single family member by ID
router.get('/:id', familyController.getSingle);

/**
 * @swagger
 * /api/family:
 *   post:
 *     summary: Add a new family member
 *     security:
 *       - googleAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FamilyMember'
 *     responses:
 *       201:
 *         description: Family member created
 *       401:
 *         description: Unauthorized
 */
// POST a new family member
router.post('/', validateFamilyMember, familyController.createFamilyMember);

/**
 * @swagger
 * /api/family/{id}:
 *   put:
 *     summary: Update a family member
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FamilyMember'
 *     responses:
 *       204:
 *         description: Family member updated
 *       401:
 *         description: Unauthorized
 */
// PUT: update a family member by ID
router.put('/:id', validateFamilyMember, familyController.updateFamilyMember);

/**
 * @swagger
 * /api/family/{id}:
 *   delete:
 *     summary: Delete a family member
 *     security:
 *       - googleAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Family member deleted
 *       401:
 *         description: Unauthorized
 */
// DELETE: remove a family member by ID
router.delete('/:id', familyController.deleteFamilyMember);

module.exports = router;
