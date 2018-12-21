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

  /** @filter @updates @options @callback
   * updates use update operators (available to docs)
  */
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5c1c0ab3e2062f5cabb528da')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then(result => {
  //   console.log(result)
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5c1bd4f07af94618a00b504e')
  }, {
    $set: {
      name: 'Milos'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then(result => {
    console.log(result)
  })


  // db.close() // closes connection with MongoDB server
})