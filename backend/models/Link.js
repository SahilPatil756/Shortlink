const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  customAlias: {
    type: String,
    unique: true,
    sparse: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Optional for MVP if we allow anonymous, but plan says dashboard requires user
  },
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;
