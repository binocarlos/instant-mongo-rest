var mongoose = require('mongoose')
var fs = require('fs')
var path = require('path')

module.exports = function(opts){
  opts = opts || {}

  if(!fs.existsSync(opts.file)){
    console.error(opts.file + ' does not exist')
    process.exit(1)
  }

  return require(opts.file)
}