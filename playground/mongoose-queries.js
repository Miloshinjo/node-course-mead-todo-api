const { ObjectID } = require('mongodb')

const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo')
const { User } = require('../server/models/user')

// const id = '5c1e6d3e2d41d79260dfbc6211'

// if (!ObjectID.isValid(id)) console.log('ID not valid')

// find - returns an array of docs, depending on what is specified
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos)
// })

// // findOne - returns first one it finds as a doc
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if (!todo) return console.log('Id not found')
//   console.log('Todo', todo)
// })

// findById - returns the doc by id
// Todo.findById(id).then((todo) => {
//   if (!todo) return console.log('Id not found')
//   console.log('Todo by Id', todo)
// }).catch(err => console.log(err))

User.findById('5c1c997f78b38d803530f339').then((user) => {
  if (!user) return console.log('User not found')
  console.log('User', user)
}).catch(err => console.log(err))