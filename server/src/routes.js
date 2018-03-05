const { passport, authenticate, isAuthenticated } = require('./auth')
const { searchIssues } = require('./issues')

module.exports = function (app) {
    app.use(passport.initialize())
    app.post('/user', authenticate)
    app.get('/issues', searchIssues)
}
