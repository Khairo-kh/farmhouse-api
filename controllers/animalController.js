const Animal = require('../models/animalModel');
const controllerHandler = require('./controllerHandler');

exports.getAllAnimals = controllerHandler.getAll(Animal);

exports.createAnimal = controllerHandler.createOne(Animal);

exports.getAnimal = controllerHandler.getOne(Animal, { path: 'weightHistory' });

exports.updateAnimal = controllerHandler.updateOne(Animal);

exports.deleteAnimal = controllerHandler.deleteOne(Animal);
