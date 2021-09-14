const express = require('express');
const weightController = require('../controllers/weightController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, weightController.getAllWeights)
  .post(
    authController.protect,
    weightController.setResourceId,
    weightController.createWeight
  );

router
  .route('/:id')
  .delete(weightController.deleteWeight)
  .get(weightController.getWeight)
  .patch(weightController.updateWeight);

module.exports = router;
