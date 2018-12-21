const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')

const app = express()

// configure middleware to use body-parser
app.use(bodyParser.json())

// create a post route for todos
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

// listen on a port
app.listen(5000, () => {
  console.log('Started on port 5000')
})