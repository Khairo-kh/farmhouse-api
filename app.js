const express = require('express');
const morgan = require('morgan');

const ApiError = require('./utils/apiError');
const errorHandler = require('./controllers/errorController');
const animalRouter = require('./Routes/animalRoutes');
const userRouter = require('./Routes/userRoutes');

const app = express();

// middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

// Routes

app.use('/api/v1/animals', animalRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(errorHandler);

module.exports = app;
