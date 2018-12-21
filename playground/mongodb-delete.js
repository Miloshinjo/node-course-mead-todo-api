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

  // deleteMany
  // db.collection('Todos').deleteMany({ text: 'Eat lunch' }).then((result) => {
  //   console.log(result)
  // })
  // deleteOne
  // db.collection('Todos').deleteOne({ text: 'Eat lunch' }).then((result) => {
  //   console.log(result)
  // })
  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
  //   console.log(result)
  // })
  // db.close() // closes connection with MongoDB server
})