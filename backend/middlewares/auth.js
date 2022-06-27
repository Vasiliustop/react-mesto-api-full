const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { cookies } = req;

  if (!cookies) {
    throw new AuthError('Необходима авторизация');
  }

  const token = cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};