const Animal = require('../models/animalModel');
const ApiError = require('../utils/apiError');
const APIfeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllAnimals = catchAsync(async (req, res, next) => {
  const feat = new APIfeatures(Animal.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();
  const animals = await feat.query;

  res.status(200).json({
    status: 'success',
    results: animals.length,
    data: { animals },
  });
});

exports.createAnimal = catchAsync(async (req, res, next) => {
  const newAnimal = await Animal.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      animal: newAnimal,
    },
  });
});

exports.getAnimal = catchAsync(async (req, res, next) => {
  const animal = await Animal.findById(req.params.id).populate('weightHistory');
  if (!animal) {
    return next(
      new ApiError(
        'the requested ID does not match any animal in the database',
        404
      )
    );
  }
  res.status(200).json({
    status: 'success',
    data: { animal },
  });
});

exports.updateAnimal = catchAsync(async (req, res, next) => {
  const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!animal) {
    return next(
      new ApiError(
        'the requested ID does not match any animal in the database',
        404
      )
    );
  }
  res.status(200).json({
    status: 'success',
    data: { animal },
  });
});

exports.deleteAnimal = catchAsync(async (req, res, next) => {
  const animal = await Animal.findByIdAndRemove(req.params.id);

  if (!animal) {
    return next(
      new ApiError(
        'the requested ID does not match any animal in the database',
        404
      )
    );
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
