const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');
const APIfeatures = require('../utils/apiFeatures');
const Animal = require('../models/animalModel');
const Weight = require('../models/weightModel');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (Model === Weight) {
      const weight = await Weight.findById(req.params.id);
      if (!weight || weight.owner.toString() !== req.user._id.toString()) {
        return next(
          new ApiError('Cannot find any weight with the passed id!', 404)
        );
      }
    }
    if (Model === Animal) {
      const animal = await Animal.findById(req.params.id);
      if (!animal || animal.owner._id.toString() !== req.user._id.toString()) {
        return next(
          new ApiError('Cannot find any animal with the passed id!', 404)
        );
      }
    }
    const doc = await Model.findByIdAndRemove(req.params.id);

    if (!doc) {
      return next(
        new ApiError(
          'the requested ID does not match any document in the database',
          404
        )
      );
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (Model === Weight) {
      const weight = await Weight.findById(req.params.id);
      if (!weight || weight.owner.toString() !== req.user._id.toString()) {
        return next(
          new ApiError('Cannot find any weight with the passed id!', 404)
        );
      }
    }
    if (Model === Animal) {
      const animal = await Animal.findById(req.params.id);
      if (!animal || animal.owner._id.toString() !== req.user._id.toString()) {
        return next(
          new ApiError('Cannot find any animal with the passed id!', 404)
        );
      }
    }
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new ApiError(
          'the requested ID does not match any document in the database',
          404
        )
      );
    }
    res.status(200).json({
      status: 'success',
      data: { data: doc },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (Model === Weight) {
      req.body.owner = req.user._id;
      const animal = await Animal.findById(req.body.animal);
      if (animal.owner._id.toString() !== req.user._id.toString()) {
        return next(
          new ApiError('Cannot find any animal with the passed id!', 404)
        );
      }
    }
    if (Model === Animal) {
      req.body.owner = req.user._id;
    }
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;
    if (!doc) {
      return next(
        new ApiError(
          'the requested ID does not match any document in the database',
          404
        )
      );
    }
    res.status(200).json({
      status: 'success',
      data: { doc },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //next two lines required only for GET nested animal weights
    let filtered = {};
    if (req.params.animalId) filtered = { animal: req.params.animalId };

    if (Model === Animal || Model === Weight) {
      filtered = { ...filtered, owner: req.user._id };
    }
    const feat = new APIfeatures(Model.find(filtered), req.query)
      .filter()
      .sort()
      .limit();
    // .paginate()
    const docs = await feat.query; //.explain();

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: { docs },
    });
  });
