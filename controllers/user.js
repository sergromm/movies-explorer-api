const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const { jwtDevSecret } = require('../utils/confing');
const { userNotFound, emailTaken } = require('../utils/error-messages');

const handleErrors = (err, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    return next(new ConflictError(emailTaken));
  }
  if (err.name === 'ValidationError') {
    return next(new ValidationError(err));
  }
  if (err.name === 'CastError') {
    return next(new CastError());
  }
  return next(err);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : jwtDevSecret,
        { expiresIn: '7d' },
      );

      res.json({ token });
    })
    .catch((err) => next(new NotAuthorizedError(err.message)));
};

const register = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => res.send({ name: user.name, id: user._id, email: user.email }))
    .catch((err) => handleErrors(err, next));
};

const getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(userNotFound))
    .then((user) => res.send(user))
    .catch((err) => handleErrors(err, next));
};

const editProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new NotFoundError(userNotFound))
    .then((user) => res.send(user))
    .catch((err) => handleErrors(err, next));
};

module.exports = {
  login,
  register,
  getUserProfile,
  editProfile,
};
