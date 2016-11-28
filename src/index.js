var http = require('http')
var fs = require('fs')
var tools = require('./tools')
var App = require('./app')

var args = require('minimist')(process.argv, {
  alias:{
    f:'file',
    p:'port',
    m:'mongohost',
    p:'mongoport',
    d:'mongodatabase'
  },
  default:{
    file:process.env.FILE,
    port:process.env.PORT || 80,
    mongohost:process.env.MONGO_SERVICE_HOST || 'mongo',
    mongoport:process.env.MONGO_SERVICE_PORT || 27017,
    mongodatabase:process.env.MONGO_SERVICE_DATABASE || 'boiler'
  }
})

if(!args.file){
  console.error('file argument required')
  process.exit(1)
}

if(!fs.existsSync(args.file)){
  console.error(args.file + ' does not exist')
  process.exit(1)
}

var app = App(args)

var httpserver = http.createServer(app)
httpserver.listen(args.port, function(){
  console.log('server listening on port ' + args.port)
})