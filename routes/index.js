const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const movieRouter = require('./movies');
const userRouter = require('./users');
const { login, register } = require('../controllers/user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { pageNotFound } = require('../utils/error-messages');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
    name: Joi.string().required().min(2).max(30),
  }),
}), register);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
  }),
}), login);

router.use(auth);

router.use('/movies', movieRouter);

router.use('/users', userRouter);

router.use((req, res, next) => next(new NotFoundError(pageNotFound)));

module.exports = router;
