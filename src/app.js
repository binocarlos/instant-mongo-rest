var express = require('express')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var restify = require('express-restify-mongoose')
var Logger = require('./logger')
var tools = require('./tools')
var Models = require('./models')

module.exports = function(opts){

  tools.connectToMongo({
    host:opts.mongohost,
    port:opts.mongoport,
    database:opts.mongodatabase
  })

  var app = express()
  app.use(Logger())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(methodOverride('X-HTTP-Method-Override'))

  var models = Models(opts)
  
  Object.keys(models || {}).forEach(function(key){
    restify.serve(app, models[key])
  })

  return app
}