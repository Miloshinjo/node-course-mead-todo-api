const mongoose = require('mongoose')

// create User model for database
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
})

// export model
module.exports = { User }
