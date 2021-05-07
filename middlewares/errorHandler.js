const { errorOnServer } = require('../utils/error-messages');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? errorOnServer
      : message,
  });
  next();
};

module.exports = errorHandler;
