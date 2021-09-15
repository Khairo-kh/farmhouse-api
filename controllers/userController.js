const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');
const controllerHandler = require('./controllerHandler');

const filterInput = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((field) => {
    if (allowedFields.includes(field)) newObj[field] = obj[field];
  });

  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new ApiError('Cannot update password in this route!', 400));
  }
  const targetedFields = filterInput(req.body, 'name', 'email');
  const updatedMe = await User.findByIdAndUpdate(req.user.id, targetedFields, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedMe,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not defined! user /signup to create a user account',
  });
};

exports.getUser = controllerHandler.getOne(User);

exports.updateUser = controllerHandler.updateOne(User);

exports.deleteUser = controllerHandler.deleteOne(User);

exports.getAllUsers = controllerHandler.getAll(User);
