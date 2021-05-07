const movieRouter = require('express').Router();
const {
  getSavedMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movie');

movieRouter.get('/', getSavedMovies);
movieRouter.post('/', saveMovie);
movieRouter.delete('/:movieId', deleteMovie);

module.exports = movieRouter;
