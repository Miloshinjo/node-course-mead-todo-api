require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')
const { authenticate } = require('./middleware/authenticate')

const app = express()
// set up evironment port variable
const port = process.env.PORT

// configure middleware to use body-parser
app.use(bodyParser.json())

// create a POST route for todos
app.post('/todos', (req, res) => {
  // create a new todo
  const todo = new Todo({
    text: req.body.text
  })
  // save todo to database
  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

// create a GET route for todos
app.get('/todos', (req, res) => {
  // get all todos from the database
  Todo.find().then((todos) => {
    res.send({ todos })
  }, (err) => {
    res.status(400).send(err)
  })
})

// create a GET route for a individual todo
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  // Validate id using isValid
  if (!ObjectID.isValid(id)) return res.status(404).send()

  Todo.findById(id).then((todo) => {
    if (!todo) return res.status(404).send()
    res.send({ todo })
  }).catch((err) => res.status(400).send())
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  // Validate id using isValid
  if (!ObjectID.isValid(id)) return res.status(404).send()

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) return res.status(404).send()
    res.send({ todo })
  }).catch(err => res.status(400).send())
})

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id
  // allow only text and completed values to be updated
  const body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(id)) return res.status(404).send()

  if (_.isBoolean(body.completed) && body.completed) {
    // set completedAt as a timestamp
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  // update the database
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then(todo => {
    if (!todo) return res.status(404).send()
    res.send({ todo })
  }).catch(err => res.status(400).send())
})

// POST /users
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password'])
  const user = new User(body)

  user.save()
    .then(() => user.generateAuthToken())
    .then(token => res.header('x-auth', token).send(user))
    .catch(err => res.status(400).send(err))
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

// POST /users/login
app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password'])

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken()
        .then(token => res.header('x-auth', token).send(user))
    })
    .catch(err => {
      res.status(400).send()
    })
})

// listen on a port
app.listen(port, () => {
  console.log(`Started on port ${port}`)
})

module.exports = { app }
