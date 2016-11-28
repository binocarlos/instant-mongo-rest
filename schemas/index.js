var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProjectSchema = new Schema({
  name: { type: String, required: true }
})

var ClientSchema = new Schema({
  name: { type: String, required: true }
})

module.exports = {
  projects:mongoose.model('projects', ProjectSchema),
  clients:mongoose.model('clients', ClientSchema)
}