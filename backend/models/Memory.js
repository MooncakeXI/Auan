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
  },
  mediaUrl: {
    type: String, // เก็บ URL ของไฟล์
    required: false // ไม่บังคับว่าทุก memory ต้องมี
  },
  mediaType: {
    type: String, // เก็บประเภทของไฟล์
    enum: ['image', 'video'], // กำหนดให้มีค่าได้แค่ 'image' หรือ 'video'
    required: false
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Memory', MemorySchema);