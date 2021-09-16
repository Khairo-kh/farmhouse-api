const Weight = require('../models/weightModel');
const ApiError = require('../utils/apiError');
const catchAsync = require('../utils/catchAsync');
const controllerHandler = require('./controllerHandler');

exports.setResourceId = (req, res, next) => {
  // values needed for nested routes
  if (!req.body.animal) req.body.animal = req.params.animalId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

//TODO: Research a way to get dailyWeightChange from models?
exports.dailyWeightChange = catchAsync(async (req, res, next) => {
  const startWeight = await Weight.findOne({ recordedOn: req.body.startDate });
  const endWeight = await Weight.findOne({ recordedOn: req.body.endDate });
  if (!startWeight || !endWeight) {
    return next(
      new ApiError(
        'Could not find weight recorded in the start/end dates provided!',
        400
      )
    );
  }
  if (endWeight.recordedOn.getTime() < startWeight.recordedOn.getTime()) {
    return next(new ApiError('End date must be later than start date!', 400));
  }

  const weightDiff = endWeight.value - startWeight.value;
  const timeBetweenMs =
    endWeight.recordedOn.getTime() - startWeight.recordedOn.getTime();

  const daysBetween = Math.floor(timeBetweenMs / (1000 * 3600 * 24));
  const dailyChange = Math.round((weightDiff / daysBetween) * 100) / 100;

  res.status(200).json({
    status: 'success',
    data: { startWeight, endWeight, daysBetween, dailyChange },
  });
});

exports.createWeight = controllerHandler.createOne(Weight);

exports.deleteWeight = controllerHandler.deleteOne(Weight);

exports.updateWeight = controllerHandler.updateOne(Weight);

exports.getWeight = controllerHandler.getOne(Weight);

exports.getAllWeights = controllerHandler.getAll(Weight);
