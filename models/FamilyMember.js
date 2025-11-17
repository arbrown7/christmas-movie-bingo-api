const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthday: { type: Date },                   // matches "birthday" JSON key if you rename it to "birthdate"
  anniversary: { type: Date },                 // new field
  relation: { type: String },
  interests: [{ type: String }],
  birthdayGiftIdeas: [{ type: String }],
  christmasGiftIdeas: [{ type: String }],
  anniversaryGiftIdeas: [{ type: String }],
  shirtSize: { type: String },                 // optional
  pantSize: { type: String },                  // optional
  shoeSize: { type: String },                  // optional
  createdBy: { type: String }                  // optional, for linking to user
}, { timestamps: true });

module.exports = mongoose.model('FamilyMember', familyMemberSchema);
