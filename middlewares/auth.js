const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new NotAuthorizedError('Необходима авторизация');
  }

  let payload;
  const { NODE_ENV, JWT_SECRET } = process.env;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'mesto-secret-key');
  } catch (err) {
    throw new NotAuthorizedError('Необходима авторизация');
  }

  req.user = payload;

  return next();
};