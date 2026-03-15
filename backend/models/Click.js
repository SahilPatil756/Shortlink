const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link',
    required: true,
  },
  country: {
    type: String,
    default: 'Unknown',
  },
  device: {
    type: String,
    default: 'Unknown',
  },
  referrer: {
    type: String,
    default: 'Direct',
  },
}, { timestamps: true });

const Click = mongoose.model('Click', clickSchema);
module.exports = Click;
