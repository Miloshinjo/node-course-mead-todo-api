// Load MongoClient from 'mongodb' lib
const { MongoClient, ObjectID } = require('mongodb')

/**
* use 'connect()' to connect to the database.
* @params URL (string)
* @params callback() (function) -> (err, db)
*/
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err)
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // }) // creates a collection, takes in a string name of a collection we want to use

  // db.collection('Users').insertOne({
  //   name: 'Milos',
  //   age: 31,
  //   location: 'Smederevo'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err)
  //   }
  //   console.log(result.ops[0]._id.getTimestamp())
  // })

  db.close() // closes connection with MongoDB server
})