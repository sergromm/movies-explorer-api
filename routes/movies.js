const { celebrate, Joi } = require('celebrate');
const movieRouter = require('express').Router();
const {
  getSavedMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movie');
const { isURL } = require('../utils/helpers');

movieRouter.get('/', getSavedMovies);

movieRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(isURL),
    trailer: Joi.string().required().pattern(isURL),
    thumbnail: Joi.string().required().pattern(isURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), saveMovie);

movieRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = movieRouter;
