const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { wrongCredentials } = require('../utils/error-messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'Email обязателен для заполнения'],
    validate: [isEmail, 'Введите валидный email'],
  },
  password: {
    type: String,
    require: [true, 'Пароль обязателен для заполнения'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Имя не может быть короче 2 символов'],
    maxlength: [30, 'Имя не может быть длиннее 30 символов'],
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
