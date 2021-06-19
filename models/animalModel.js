const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  no: {
    type: String,
    required: [true, 'Must provide the animal ID'],
    unique: true,
  },
  birth_date: String,
  weight: [Object],
  status: { type: String, default: 'alive' },
  location: { type: Number, default: 22 },
  notes: String,
  createdAt: { type: Date, default: Date.now(), select: false },
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
