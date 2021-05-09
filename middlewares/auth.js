const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const { jwtDevSecret } = require('../utils/confing');
const { authRequired } = require('../utils/error-messages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError(authRequired);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  const { NODE_ENV, JWT_SECRET } = process.env;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtDevSecret);
  } catch (err) {
    throw new NotAuthorizedError(authRequired);
  }

  req.user = payload;

  return next();
};
