const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://movies.nomoredomains.club',
    'https://movies.nomoredomains.club',
  ],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'authorization'],
  credentials: true,
};
const dbpath = 'mongodb://localhost:27017/moviesexplorerdb';
const jwtDevSecret = 'mesto-secret-key';

module.exports = {
  corsOptions,
  dbpath,
  jwtDevSecret,
};
