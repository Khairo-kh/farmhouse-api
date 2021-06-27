const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema(
  {
    no: {
      type: String,
      required: [true, 'Must provide the animal ID.'],
      unique: true,
    },
    birth_date: Date,
    weight: [Object],
    status: { type: String, default: 'alive' },
    location: {
      type: Number,
      default: 22,
      min: [1, 'section number must be positive.'],
    },
    notes: String,
    createdAt: { type: Date, default: Date.now(), select: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual property for age info
animalSchema.virtual('age').get(function () {
  const now = Date.now();
  const bDate = new Date(this.birth_date);
  const timeDiff = now - bDate.getTime();
  const daysOld = Math.floor(timeDiff / (1000 * 3600 * 24));
  const monthsOld = Math.floor(daysOld / 30);
  const yearsOld = Math.round((monthsOld / 12) * 100) / 100;

  return { days: daysOld, months: monthsOld, years: yearsOld };
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
