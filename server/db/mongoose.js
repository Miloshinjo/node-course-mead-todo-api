const mongoose = require('mongoose')

// tell Mongoose to use promises instead of callbacks
mongoose.Promise = global.Promise
// connect to database (either heroku or local)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp')
// export the data
module.exports = { mongoose }
