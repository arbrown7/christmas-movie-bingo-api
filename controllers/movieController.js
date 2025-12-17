const Movie = require('../models/Movie');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    const mov = await Movie.findById(req.params.id);
    if (!mov) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(mov);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const cleanMovie = {
      timestamp: new Date(), // server controls this
      title: req.body.title?.trim(),
      mainCharacterName: req.body.mainCharacterName?.trim(),
      mainCharacterOccupation: req.body.mainCharacterOccupation?.trim(),
      mainCharacterHometown: req.body.mainCharacterHometown?.trim(),
      mainCharacterCurrentCity: req.body.mainCharacterCurrentCity?.trim(),
      mainCharacterLoveInterest: req.body.mainCharacterLoveInterest?.trim(),
      loveInterestOccupation: req.body.loveInterestOccupation?.trim(),
      conflict: req.body.conflict?.trim(),
      howChristmasIsSaved: req.body.howChristmasIsSaved?.trim(),
      lessonLearned: req.body.lessonLearned?.trim(),
      movieRating: Number(req.body.movieRating)
    };

    const mov = new Movie(cleanMovie);
    await mov.save();

    res.status(201).json(mov);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateMovie = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Movie not found' });
    res.status(204).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie
};
