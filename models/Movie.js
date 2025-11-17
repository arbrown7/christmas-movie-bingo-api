const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - timestamp
 *         - title
 *         - mainCharacterName
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated MongoDB ObjectId
 *           example: 691a9fa4aff54959f349f5e7
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The date and time the movie was watched or logged
 *           example: "2025-11-15T16:36:32.000Z"
 *         title:
 *           type: string
 *           example: "Trivia at St. Nicks"
 *         mainCharacterName:
 *           type: string
 *           example: "Celeste"
 *         mainCharacterOccupation:
 *           type: string
 *           example: "Astronomer"
 *         mainCharacterHometown:
 *           type: string
 *           example: "Small Town"
 *         mainCharacterCurrentCity:
 *           type: string
 *           example: "Small Town"
 *         mainCharacterLoveInterest:
 *           type: string
 *           example: "Her enemy, Offensive coordinator"
 *         loveInterestOccupation:
 *           type: string
 *           example: "Offensive coordinator"
 *         conflict:
 *           type: string
 *           example: "Losing at trivia"
 *         howChristmasIsSaved:
 *           type: string
 *           example: "Is ok with winning or losing at trivia"
 *         lessonLearned:
 *           type: string
 *           example: "She and (love interest's name) are meant to be together"
 *         movieRating:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 5
 *           example: 4
 *       description: A Christmas movie entry with plot and rating
 */

const movieSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  mainCharacterName: {
    type: String,
    required: true,
    trim: true
  },
  mainCharacterOccupation: {
    type: String,
    trim: true
  },
  mainCharacterHometown: {
    type: String,
    trim: true
  },
  mainCharacterCurrentCity: {
    type: String,
    trim: true
  },
  mainCharacterLoveInterest: {
    type: String,
    trim: true
  },
  loveInterestOccupation: {
    type: String,
    trim: true
  },
  conflict: {
    type: String,
    trim: true
  },
  howChristmasIsSaved: {
    type: String,
    trim: true
  },
  lessonLearned: {
    type: String,
    trim: true
  },
  movieRating: {
    type: Number,
    min: 0,
    max: 5
  }
});

module.exports = mongoose.model('Movie', movieSchema);
