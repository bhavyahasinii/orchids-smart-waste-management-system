const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
  bin_id: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Empty', 'Half', 'Full'],
    default: 'Empty',
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bin', binSchema);
