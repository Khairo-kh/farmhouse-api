const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema(
  {
    recordedOn: {
      type: Date,
      required: [
        true,
        'Must provide the date on which the weight was recorded!',
      ],
    },
    value: {
      type: Number,
      required: [true, 'Must provide the value of the weight recorded!'],
    },
    createdAt: { type: Date, default: Date.now },

    animal: {
      type: mongoose.Schema.ObjectId,
      ref: 'Animal',
      required: [true, 'Weight must belong to some animal!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Must specify which user recorded the weight'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Weight = mongoose.model('Weight', weightSchema);

module.exports = Weight;
