const BingoPrompt = require('../models/Bingo');
const mongoose = require('mongoose');

// GET all prompts
const getAll = async (req, res) => {
  try {
    const prompts = await BingoPrompt.find();
    res.status(200).json(prompts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single prompt
const getSingle = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    const prompt = await BingoPrompt.findById(req.params.id);
    if (!prompt) return res.status(404).json({ message: 'Prompt not found' });
    res.status(200).json(prompt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new prompt
const create = async (req, res) => {
  try {
    const prompt = new BingoPrompt(req.body);
    await prompt.save();
    res.status(201).json(prompt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update a prompt
const update = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    const updated = await BingoPrompt.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Prompt not found' });
    res.status(204).json(updated); // 204 No Content
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a prompt
const deletePrompt = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    const deleted = await BingoPrompt.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Prompt not found' });
    res.status(200).send(); // 200 OK
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  update,
  delete: deletePrompt
};
