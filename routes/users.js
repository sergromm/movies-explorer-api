const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();
const { getUserProfile, editProfile } = require('../controllers/user');

userRouter.get('/me', getUserProfile);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
}), editProfile);

module.exports = userRouter;
