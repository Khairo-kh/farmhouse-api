const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const ApiError = require('./utils/apiError');
const errorHandler = require('./controllers/errorController');
const animalRouter = require('./Routes/animalRoutes');
const userRouter = require('./Routes/userRoutes');

const app = express();

// middleware
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 1800,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests! Try again later',
});

app.use('/api', limiter);
app.use(express.json({ limit: '10mb' }));

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
