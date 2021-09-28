const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized');
const ForbiddenError = require('../errors/forbidden');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env; // env-переменные из process.env
  if (!req.cookies.token) {
    const err = new ForbiddenError('Необходима авторизация!');
    return next(err);
  }
  let payload;
  try {
    // метод jwt.verify вернёт пейлоуд токена, если тот прошёл проверку
    payload = jwt.verify(req.cookies.token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    const err = new UnauthorizedError('Нет доступа!');
    return next(err);
  }
  // пейлоуд с данными пользователя (_id) в объект запроса
  req.user = payload;
  return next();
};
