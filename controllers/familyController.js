const FamilyMember = require('../models/FamilyMember');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
  try {
    const familyMembers = await FamilyMember.find();
    res.status(200).json(familyMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    const member = await FamilyMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Family member not found' });
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createFamilyMember = async (req, res) => {
  try {
    const member = new FamilyMember(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateFamilyMember = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    const updated = await FamilyMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Family member not found' });
    res.status(204).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteFamilyMember = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    const deleted = await FamilyMember.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Family member not found' });
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember
};
