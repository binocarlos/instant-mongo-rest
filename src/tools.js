var mongoose = require('mongoose')
var bluebird = require('bluebird')
mongoose.Promise = require('bluebird')

function connectToMongo(args){
  var connectionUrl = 'mongodb://' + args.host + ':' + args.port + '/' + args.database

  var isConnectedBefore = false;
  function connect() {
      mongoose.connect(connectionUrl, {server: { auto_reconnect: true }})
  }
  connect()

  mongoose.connection.on('error', function() {
      console.log('Could not connect to MongoDB')
  })

  mongoose.connection.on('disconnected', function(){
    console.log('Lost MongoDB connection...')
    if (!isConnectedBefore) connect()
  })
  mongoose.connection.on('connected', function() {
    isConnectedBefore = true
    console.log('Connection established to MongoDB')
  })

  mongoose.connection.on('reconnected', function() {
    console.log('Reconnected to MongoDB')
  })

  // Close the Mongoose connection, when receiving SIGINT
  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Force to close the MongoDB conection')
      process.exit(0)
    })
  })
}

module.exports = {
  connectToMongo:connectToMongo
}