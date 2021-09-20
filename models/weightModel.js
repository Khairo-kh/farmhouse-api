const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema(
  {
    recordedOn: {
      type: Date,
      default: Date.now(),
      required: [
        true,
        'Must provide the date on which the weight was recorded!',
      ],
    },
    value: {
      type: Number,
      required: [true, 'Must provide the value of the weight recorded!'],
    },
    createdAt: { type: Date, default: Date.now() },

    animal: {
      type: mongoose.Schema.ObjectId,
      ref: 'Animal',
      required: [true, 'Weight must belong to some animal!'],
    },
    owner: {
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

weightSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

const Weight = mongoose.model('Weight', weightSchema);

module.exports = Weight;
