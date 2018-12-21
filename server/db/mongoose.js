const mongoose = require('mongoose')

// tell Mongoose to use promises instead of callbacks
mongoose.Promise = global.Promise
// connect to database
mongoose.connect('mongodb://localhost:27017/TodoApp')

module.exports = { mongoose }
