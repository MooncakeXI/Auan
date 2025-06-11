const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, 'Title is required.'] 
  },
  description: {
    type: String,
    required: [true, 'Description is required.']
  },
  date: {
    type: Date,
    required: [true, 'Date is required.']
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Memory', MemorySchema);