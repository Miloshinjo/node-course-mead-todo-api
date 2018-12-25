const mongoose = require('mongoose')
const { isEmail } = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

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

const User = mongoose.model('User', UserSchema)

// export model
module.exports = { User }
