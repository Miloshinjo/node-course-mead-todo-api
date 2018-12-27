const env = process.env.NODE_ENV || 'development'

// set up local configuration
if (env === 'development' || env === 'test') {
  const config = require('./config.json')
  const envConfig = config[env]

  // set properties on process.env
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key]
  })
}

