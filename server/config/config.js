const env = process.env.NODE_ENV || 'development'
console.log('env *****', env)

if (env === 'development') {
  // set up development database link
  process.env.PORT = 5000
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
} else if (env === 'test') {
  // set up test database link
  process.env.PORT = 5000
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}

