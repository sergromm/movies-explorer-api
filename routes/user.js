const userRouter = require('express').Router();
const { getUserProfile, editProfile } = require('../controllers/user');

userRouter.get('/me', getUserProfile);
userRouter.patch('/me', editProfile);

module.exports = userRouter;
