const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', HistorySchema);
