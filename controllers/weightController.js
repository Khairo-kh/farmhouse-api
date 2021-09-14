const Weight = require('../models/weightModel');
const controllerHandler = require('./controllerHandler');

exports.setResourceId = (req, res, next) => {
  // values needed for nested routes
  if (!req.body.animal) req.body.animal = req.params.animalId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createWeight = controllerHandler.createOne(Weight);

exports.deleteWeight = controllerHandler.deleteOne(Weight);

exports.updateWeight = controllerHandler.updateOne(Weight);

exports.getWeight = controllerHandler.getOne(Weight);

exports.getAllWeights = controllerHandler.getAll(Weight);
