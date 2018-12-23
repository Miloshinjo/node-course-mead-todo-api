const { ObjectID } = require('mongodb')

const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo')
const { User } = require('../server/models/user')

// remove - remove everything or a single doc
// Todo.remove({}).then(result => {
//   console.log(result)
// })

// findOneAndRemove - removes first document and returns the data

// findByIdAndRemove - works like findById (and removes it)
Todo.findByIdAndRemove('5c1f529ee2062f5cabb54f24').then((todo) => {
  console.log(todo)
})