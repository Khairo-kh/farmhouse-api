const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');
const APIfeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
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

//TODO: Make sure UpdateOne function cannot update password!
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
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

    const feat = new APIfeatures(Model.find(filtered), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
    const docs = await feat.query;

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: { docs },
    });
  });
