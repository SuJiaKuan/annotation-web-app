module.exports =
  process.env.NODE_ENV === 'production' ? require('./client-config.prod') : require('./client-config.dev')
