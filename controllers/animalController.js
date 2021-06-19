const Animal = require('../models/animalModel');

exports.getAllAnimals = async (req, res) => {
  try {
    // Handle query
    const queryObj = { ...req.query };
    const ignoredFields = ['page', 'sort', 'limit', 'fields'];
    ignoredFields.forEach((entry) => {
      delete queryObj[entry];
    });
    // Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Animal.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortCriteria = req.query.split(',').join(' ');
      query = query.sort(sortCriteria);
    } else {
      query = query.sort('-createdAt');
    }

    // projecting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v')
    }
    const animals = await query;

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
