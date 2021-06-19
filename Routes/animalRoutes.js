const express = require('express');

const animalController = require('../controllers/animalController');

const router = express.Router();

// router.param('id', animalController.checkID);

router
  .route('/')
  .get(animalController.getAllAnimals)
  .post(animalController.createAnimal);

router
  .route('/:id')
  .get(animalController.getAnimal)
  .patch(animalController.updateAnimal)
  .delete(animalController.deleteAnimal);

module.exports = router;
