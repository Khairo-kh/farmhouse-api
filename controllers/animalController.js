const Animal = require('../models/animalModel');
const APIfeatures = require('../utils/apiFeatures');

exports.getAllAnimals = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createAnimal = async (req, res) => {
  try {
    const newAnimal = await Animal.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        animal: newAnimal,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'data sent is invalid!',
    });
  }
};

exports.getAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { animal },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { animal },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    await Animal.findByIdAndRemove(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
