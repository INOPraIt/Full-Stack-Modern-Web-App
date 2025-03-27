function ensureAuthenticated(request, reply, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  reply.status(401).send({ message: 'Не авторизован' });
}

module.exports = ensureAuthenticated;