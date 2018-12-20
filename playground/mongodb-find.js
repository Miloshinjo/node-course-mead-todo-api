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

  // querying the database
  // db.collection('Todos').find({
  //   _id: new ObjectID('5c1bd3df6a89c96228fc9e3a')
  // }).toArray()
  //   .then((docs) => {
  //     console.log('Todos')
  //     console.log(JSON.stringify(docs, undefined, 2))
  //   }, (err) => {
  //     console.log('Unable to fetch todos', err)
  //   })

  // db.collection('Todos').find().count()
  //   .then((count) => {
  //     console.log(`Todos count: ${count}`)
  //   }, (err) => {
  //     console.log('Unable to fetch count', err)
  //   })

  db.collection('Users').find({ name: 'Milos' }).toArray()
    .then((docs) => {
      console.log('Users with Milos name')
      console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
      console.log('Unable to fetch users', err)
    })

  // db.close() // closes connection with MongoDB server
})