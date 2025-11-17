const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: String,
  purchased: { type: Boolean, default: false },
  familyMember: { type: String }
});

module.exports = mongoose.model('Gift', giftSchema);
