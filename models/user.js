const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const {
  wrongCredentials,
  emailIsRequired,
  notValidEmail,
  passwordIsRequired,
  nameIsTooShort,
  nameIsTooLong,
} = require('../utils/error-messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, emailIsRequired],
    validate: [isEmail, notValidEmail],
  },
  password: {
    type: String,
    require: [true, passwordIsRequired],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, nameIsTooShort],
    maxlength: [30, nameIsTooLong],
    default: 'User',
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(wrongCredentials));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(wrongCredentials));
          }
          return user;
        });
    });
});

module.exports = mongoose.model('user', userSchema);
