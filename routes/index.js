const router = require('express').Router();
const movieRouter = require('./movie');
const userRouter = require('./user');
const { login, register } = require('../controllers/user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', register);
router.post('/signin', auth, login);

router.use(auth);
router.use('/movie', movieRouter);
router.use('/user', userRouter);

router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
