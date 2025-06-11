const mongoose = require('mongoose');
const { Schema } = mongoose;

const WishSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Text content is required.'],
    trim: true,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model('Wish', WishSchema);