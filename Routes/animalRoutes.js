const express = require('express');
const animalController = require('../controllers/animalController');
const authController = require('../controllers/authController');
const weightRouter = require('./weightRoutes');

const router = express.Router();

// router.param('id', animalController.checkID);

router.use('/:animalId/weights', weightRouter);

router
  .route('/')
  .get(authController.protect, animalController.getAllAnimals)
  .post(animalController.createAnimal);

router
  .route('/:id')
  .get(animalController.getAnimal)
  .patch(animalController.updateAnimal)
  .delete(animalController.deleteAnimal);

module.exports = router;
