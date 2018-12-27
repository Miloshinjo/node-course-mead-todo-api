const mongoose = require('mongoose')
const { isEmail } = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

// create User schema and model for database
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

// override a toJSON method so we can pick properties only we want to show
UserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  return _.pick(userObject, ['_id', 'email'])
}

// generate JWT
UserSchema.methods.generateAuthToken = function () {
  const user = this
  const access = 'auth'
  const token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'abc123').toString()

  user.tokens = user.tokens.concat([{ access, token }])

  return user.save().then(() => {
    return token
  })
}

// remove JWT token
UserSchema.methods.removeToken = function (token) {
  const user = this
  // $pull lets u remove a prop from mongodb
  return user.update({
    $pull: {
      tokens: { token }
    }
  })
}

// statics becomes a model method, not an instace method
UserSchema.statics.findByToken = function (token) {
  const User = this
  let decoded

  try {
    decoded = jwt.verify(token, 'abc123')
  } catch (err) {
    return Promise.reject()
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.statics.findByCredentials = function (email, password) {
  const User = this;

  // find the user by email
  return User.findOne({ email })
    .then(user => {
      if (!user) return Promise.reject()

      return new Promise((resolve, reject) => {
        // Use bcrypt.compare to compare password and user.password
        bcrypt.compare(password, user.password, (err, res) => res ? resolve(user) : reject())
      })
    })
}

// Run before we save something to the database
UserSchema.pre('save', function (next) {
  const user = this

  // make sure to run only when password was modified
  if (user.isModified('password')) {
    // hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    // end the middleware without doing anything
    next()
  }
})

const User = mongoose.model('User', UserSchema)

// export model
module.exports = { User }


