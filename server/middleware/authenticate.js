const { User } = require('../models/user')

const authenticate = (req, res, next) => {
  const token = req.header('x-auth')

  User.findByToken(token)
    .then(user => {
      if (!user) return Promise.reject() // reject promise if token is not valid, send user to 401

      req.user = user
      req.token = token
      next()
    })
    .catch(err => res.status(401).send())
}

module.exports = { authenticate }
