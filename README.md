# instant-mongo-rest

A Docker container that spins up a HTTP server with a REST API onto a Mongo database.

It uses [express-restify-mongoose](https://github.com/florianholzapfel/express-restify-mongoose)

## install

```bash
$ docker pull binocarlos/instant-mongo-rest
```

## CLI options

When running in standalone mode from the command line:

 * --file - FILE - the file to import your models from - this can include other files
 * --port - PORT - the port to listen on (default = 80)
 * --mongohost - MONGO_SERVICE_HOST - the hostname of the mongo service
 * --mongoport - MONGO_SERVICE_PORT - the port of the mongo service (default = 27017)
 * --mongodatabase - MONGO_SERVICE_DATABASE - the mongo database to connect to
 
## example

You import [Mongoose Models](http://mongoosejs.com/docs/models.html) and [Mongoose Schemas](http://mongoosejs.com/docs/guide.html) from a file you add into the base Docker image (or mount in development).

Here is an example file importing 2 schemas in the form of Mongoose models (in a file called `./schemas/index.js`)

```javascript
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
```

The file should export an object with with values being Mongoose models.

We use the following `docker-compose` setup to run these models:

```yaml
version: '2'
services:
  mongo:
    image: mongo
  storage:
    image: binocarlos/instant-mongo-rest
    ports:
      - "8000:80"
    links:
      - mongo:mongo
    volumes:
      - ./schemas/index.js:/app/src/schemas.js
    environment:
      FILE: /app/src/schemas.js
      MONGO_SERVICE_HOST: mongo
      MONGO_SERVICE_PORT: 27017
      MONGO_SERVICE_DATABASE: storagetest
```

This will automatically serve the [following endpoints](https://florianholzapfel.github.io/express-restify-mongoose/):

```
GET http://localhost/api/v1/{clients,projects}/count
GET http://localhost/api/v1/{clients,projects}
POST http://localhost/api/v1/{clients,projects}
DELETE http://localhost/api/v1/{clients,projects}

GET http://localhost/api/v1/{clients,projects}/:id
GET http://localhost/api/v1/{clients,projects}/:id/shallow
PUT http://localhost/api/v1/{clients,projects}/:id
POST http://localhost/api/v1/{clients,projects}/:id
PATCH http://localhost/api/v1/{clients,projects}/:id
DELETE http://localhost/api/v1/{clients,projects}/:id
```


## license

MIT