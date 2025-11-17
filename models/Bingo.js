const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     BingoPrompt:
 *       type: object
 *       required:
 *         - prompt
 *         - type
 *       properties:
 *         prompt:
 *           type: string
 *           description: The text of the bingo prompt
 *         type:
 *           type: string
 *           enum: [work, love, repeatable]
 *           description: Category of the prompt
 */
const bingoPromptSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["work", "love", "repeatable"],
  },
});

module.exports = mongoose.model('Bingo', bingoPromptSchema);
