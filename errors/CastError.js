class CastError extends Error {
  constructor() {
    super();
    this.message = 'Передан невалидный id';
    this.statusCode = 400;
  }
}

module.exports = CastError;
