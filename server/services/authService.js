const { findUser } = require('../models/User');

function authenticate(username, password, done) {
  const user = findUser(username);
  if (!user || user.password !== password) {
    return done(null, false, { message: 'Неверное имя пользователя или пароль' });
  }
  return done(null, user);
}

function serializeUser(user, done) {
  done(null, user.id);
}

function deserializeUser(id, done) {
  const user = findUserById(id);
  done(null, user);
}

module.exports = { authenticate, serializeUser, deserializeUser };