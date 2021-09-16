const express = require('express');
const weightController = require('../controllers/weightController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, weightController.getAllWeights)
  .post(weightController.setResourceId, weightController.createWeight);

router
  .route('/:id')
  .delete(weightController.deleteWeight)
  .get(weightController.getWeight)
  .patch(weightController.updateWeight);

router.route('/dailyWeightChange').post(weightController.dailyWeightChange);

module.exports = router;
