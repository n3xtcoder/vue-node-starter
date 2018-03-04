const { passport, authenticate, isAuthenticated } = require('./auth');

module.exports = function (app) {
    app.use(passport.initialize())
    app.post('/user', authenticate)
}
