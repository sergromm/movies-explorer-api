const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const CastError = require('../errors/CastError');
const ValidationError = require('../errors/ValidationError');
const { movieNotFound, forbiddenToDelete } = require('../utils/error-messages');

const handleErrors = (err, next) => {
  if (err.name === 'ValidationError') {
    return next(new ValidationError(err));
  }
  if (err.name === 'CastError') {
    return next(new CastError());
  }
  return next(err);
};

const getSavedMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const saveMovie = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailer, thumbnail,
    movieId, nameRU, nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => handleErrors(err, next));
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => new NotFoundError(movieNotFound))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError(forbiddenToDelete);
      } else {
        return movie.remove().then(() => res.send(movie));
      }
    })
    .catch((err) => handleErrors(err, next));
};

module.exports = {
  getSavedMovies,
  saveMovie,
  deleteMovie,
};
