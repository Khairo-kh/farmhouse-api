const Weight = require('../models/weightModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllWeights = catchAsync(async (req, res, next) => {
  let filtered = {};
  if (req.params.animalId) filtered = { animal: req.params.animalId };
  const weights = await Weight.find(filtered);

  res.status(200).json({
    status: 'success',
    results: weights.length,
    data: {
      weights,
    },
  });
});

exports.createWeight = catchAsync(async (req, res, next) => {
  // values needed for nested routes
  if (!req.body.animal) req.body.animal = req.params.animalId;
  if (!req.body.user) req.body.user = req.user.id;
  const newWeight = await Weight.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      weight: newWeight,
    },
  });
});
