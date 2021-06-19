const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  no: {
    type: String,
    required: [true, 'Must provide the animal ID'],
    unique: true,
  },
  birth_date: String,
  weight: Array,
  status: { type: String, default: 'alive' },
  notes: String,
  location: Number,
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
