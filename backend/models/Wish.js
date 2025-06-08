const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

module.exports = mongoose.model('Wish', WishSchema);