const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');

const handleErrors = (err, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    return next(new ConflictError('Пользователь с такой почтой уже существует'));
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
        NODE_ENV === 'production' ? JWT_SECRET : 'mesto-secret-key',
        { expiresIn: '7d' },
      );

      res.json({ token });
    })
    .catch((err) => next(new NotAuthorizedError(err.message)));
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => res.send({ name: user.name, id: user._id, email: user.email }))
    .catch((err) => handleErrors(err, next));
};

const getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => handleErrors(err, next));
};

const editProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => handleErrors(err, next));
};

module.exports = {
  login,
  createUser,
  getUserProfile,
  editProfile,
};
