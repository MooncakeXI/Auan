const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Memory', MemorySchema);