// ошибки запросов
const movieNotFound = 'Фильм не найден';
const forbiddenToDelete = 'Нельзя удалить фильм из чужого списка';
const userNotFound = 'Пользователь не найден';
const emailTaken = 'Пользователь с такой почтой уже существует';
const authRequired = 'Необходима авторизация';
const errorOnServer = 'На сервере произошла ошибка';
const wrongCredentials = 'Неправильный логин или пароль';
const pageNotFound = 'Страница не найдена';
// ошибки схемы User
const emailIsRequired = 'Email обязателен для заполнения';
const notValidEmail = 'Введите валидный email';
const passwordIsRequired = 'Пароль обязателен для заполнения';
const nameIsTooShort = 'Имя не может быть короче 2 символов';
const nameIsTooLong = 'Имя не может быть длиннее 30 символов';

module.exports = {
  movieNotFound,
  forbiddenToDelete,
  userNotFound,
  emailTaken,
  authRequired,
  errorOnServer,
  wrongCredentials,
  pageNotFound,
  emailIsRequired,
  notValidEmail,
  passwordIsRequired,
  nameIsTooShort,
  nameIsTooLong,
};
