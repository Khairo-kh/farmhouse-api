const Weight = require('../models/weightModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllWeights = catchAsync(async (req, res, next) => {
  const weights = await Weight.find();

  res.status(200).json({
    status: 'success',
    results: weights.length,
    data: {
      weights,
    },
  });
});

exports.createWeight = catchAsync(async (req, res, next) => {
  const newWeight = await Weight.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      weight: newWeight,
    },
  });
});
