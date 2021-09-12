const express = require('express');
const weightController = require('../controllers/weightController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, weightController.getAllWeights)
  .post(authController.protect, weightController.createWeight);

module.exports = router;
