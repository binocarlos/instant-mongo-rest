var mongoose = require('mongoose')
var fs = require('fs')
var path = require('path')
var pino = require('pino')
var logger = pino()

module.exports = function(opts){
  opts = opts || {}

  if(!fs.existsSync(opts.file)){
    logger.error(opts.file + ' does not exist')
    process.exit(1)
  }

  return require(opts.file)
}