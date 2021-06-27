const ApiError = require('../utils/apiError');

const castErrHandler = (err) => {
  const message = `invalid ${err.path}: ${err.value}.`;
  return new ApiError(message, 400);
};

const validationErrHandler = (err) => {
  const errors = Object.values(err.errors).map((obj) => obj.message);
  const message = `invalid input data. ${errors.join('. ')}`;
  return new ApiError(message, 400);
};

const duplicateFieldHandler = (err) => {
  const duplicateVal = err.keyValue.no;
  const message = `Duplicate value received: ${duplicateVal}. This field must be unique `;
  return new ApiError(message, 400);
};

const devErrors = (err, res) => {
  res.status(err.statusCode).json({
    error: err,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const prodError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.answer,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    devErrors(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let errorObj = JSON.parse(JSON.stringify(err));
    if (errorObj.name === 'CastError') {
      errorObj = castErrHandler(errorObj);
    }
    if (errorObj.code === 11000) {
      errorObj = duplicateFieldHandler(errorObj);
    }
    console.log(errorObj.name);

    if (errorObj.name === 'ValidationError') {
      errorObj = validationErrHandler(errorObj);
    }
    console.log(errorObj.name);
    prodError(errorObj, res);
  }
};
