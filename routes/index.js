const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const movieRouter = require('./movie');
const userRouter = require('./user');
const { login, register } = require('../controllers/user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

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

router.use(celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), auth);

router.use('/movies', movieRouter);

router.use('/user', userRouter);

router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
