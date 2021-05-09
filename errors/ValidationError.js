class ValidationError extends Error {
  constructor(err) {
    super();
    this.message = `${Object.values(err.errors).map((error) => error.message).join(', ')}`;
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
