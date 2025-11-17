const Gift = require('../models/Gift');
const mongoose = require('mongoose');

// GET all gifts
const getAll = async (req, res) => {
  try {
    const gifts = await Gift.find().populate('familyMember');
    res.status(200).json(gifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single gift
const getSingle = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    const gift = await Gift.findById(req.params.id).populate('familyMember');
    if (!gift) return res.status(404).json({ message: 'Gift not found' });
    res.status(200).json(gift);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new gift
const create = async (req, res) => {
  try {
    const gift = new Gift(req.body);
    await gift.save();
    res.status(201).json(gift);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update a gift
const update = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    const updated = await Gift.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Gift not found' });
    res.status(204).json(updated); // 204 No Content
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a gift
const deleteGift = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    const deleted = await Gift.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Gift not found' });
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
  delete: deleteGift
};
