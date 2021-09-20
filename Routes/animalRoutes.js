const express = require('express');
const animalController = require('../controllers/animalController');
const authController = require('../controllers/authController');
const weightRouter = require('./weightRoutes');

const router = express.Router();

router.use('/:animalId/weights', weightRouter);

router
  .route('/')
  .get(authController.protect, animalController.getAllAnimals)
  .post(authController.protect, animalController.createAnimal);

router
  .route('/:id')
  .get(authController.protect, animalController.getAnimal)
  .patch(authController.protect, animalController.updateAnimal)
  .delete(authController.protect, animalController.deleteAnimal);

module.exports = router;
