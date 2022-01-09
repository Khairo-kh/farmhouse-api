const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');
const Email = require('../utils/email');
const db = require('../utils/db');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const handleToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  await db.connectDataBase();
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  await new Email(newUser, 'not-used').sendWelcome();
  handleToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError('Please provide email and password!', 400));
  }
  await db.connectDataBase();

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new ApiError('Email and/or password do not match!', 401));
  }
  handleToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new ApiError('You must be logged in to perform this action!', 401)
    );
  }
  await db.connectDataBase();
  const decodedJwt = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const tokenOwner = await User.findById(decodedJwt.id);

  if (!tokenOwner) {
    return next(
      new ApiError('The token belongs to a user that no longer exists', 401)
    );
  }
  if (tokenOwner.passwordChangedAfter(decodedJwt.iat)) {
    return next(
      new ApiError('The password was changed recently! Please log in again!')
    );
  }

  req.user = tokenOwner;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  await db.connectDataBase();
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(
        'There is no user associated with the provided email address',
        404
      )
    );
  }

  const resetToken = user.generatePasswdResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswdReset();

    res.status(200).json({
      status: 'success',
      message: 'Reset password email sent',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new ApiError('Error sending the reset password email! try again!', 500)
    );
  }
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError('You are not authorized to perform this action!', 403)
      );
    }

    next();
  };

exports.resetPassword = catchAsync(async (req, res, next) => {
  await db.connectDataBase();
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError('Reset token is invalid or expired!'), 400);
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  handleToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  await db.connectDataBase();
  const user = await User.findById(req.user.id).select('+password');
  if (!user.isCorrectPassword(req.body.currentPass, user.password)) {
    return next(new ApiError('Current password is incorrect!', 401));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  handleToken(user, 200, res);
});
