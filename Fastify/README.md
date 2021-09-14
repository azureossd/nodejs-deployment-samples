
# Fastify

Fastify is built as a general-purpose web framework, but it shines when building extremely fast HTTP APIs that use JSON as the data format. 

These are the main features and principles on which Fastify has been built:

* Highly performant: depending on the code complexity Fastify can serve up to 30 thousand requests per second.
* Extensible: Fastify is fully extensible via its hooks, plugins and decorators.
* Schema based: even if it is not mandatory it is recommended to use JSON Schema to validate your routes and serialize your outputs, internally Fastify compiles the schema in a highly performant function.
* Logging: As Fastify is focused on performance, it uses pino as its logger, with the default log level, when enabled, set to 'info'.
* Developer friendly: the framework is built to be very expressive and to help developers in their daily use, without sacrificing performance and security.
* TypeScript ready: Fastify maintains a TypeScript type declaration file to support the growing TypeScript community.


## Create and Deploy a Fastify app with Oryx
### Using the Fastify CLI

https://github.com/fastify/create-fastify

Generate a Fastify project in your project directory:

```node
npm init fastify
```

Install the dependencies:

```node
npm install 
```

Start the application locally:

```node
npm start
```

Note, Fastify runs on localhost by default. When deploying to a Docker, and potentially other, containers, it is advisable to set a fastify address of 0.0.0.0 because these containers do not default to exposing mapped ports to localhost.

```log
> fastify start -l info app.js

{"level":30,"time":1630428354887,"pid":24712,"hostname":"MININT-KCEPTGE","msg":"Server listening at http://127.0.0.1:3000"}
```

For containers built and run specifically by the Docker Daemon, fastify-cli is able to detect that the server process is running within a Docker container and the 0.0.0.0 listen address is set automatically. If it was not able to detect that the application is running in a container then the address can be set with the enviroment variable **FASTIFY_ADDRESS**.

https://github.com/fastify/fastify-cli

Create a Web App and set your deployment method. As the Fastify CLI is detecting that the server process is running in a Docker container, Oryx is able to succesfully build and deploy the application without any extra configuration needed.

### Barebones without the Fastify CLI

Initialize a new project:

```node
npm init
```

Get Fastify with NPM:

```node
npm install fastify
```

Then create index.js and add the following content:

```node
// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

// Azure will set the enviroment variable PORT.
const port = process.env.PORT || 3000;

// Declare a route
fastify.get('/', function (request, reply) {
reply.send({ hello: 'Azure' })
})

// Fastify defaults to listening only on the localhost 127.0.0.1 interface. 
// To listen on all available IPv4 interfaces and pass the Azure health check
// the example should be modified to listen on 0.0.0.0 like so:
fastify.listen(port, '0.0.0.0', function (err, address) {
if (err) {
  fastify.log.error(err)
  process.exit(1)
}
fastify.log.info(`server listening on ${address}`)
})
```

Note, to listen on all available IPv4 interfaces and pass the Azure health check, fastify.listen should be modified to listen on 0.0.0.0.

Create a Web App and set your deployment method. As we haven't specified a start script in package.json, Oryx will use the script specified in the main field.

## Troubleshooting

### Long Term Support

Node version 15.0.0 is not listed under Fastify's LTS.

https://www.fastify.io/docs/master/LTS/

### Logging

Logging is disabled by default, and you can enable it by passing { logger: true } or { logger: { level: 'info' } } when you create a fastify instance. Note that if the logger is disabled, it is impossible to enable it at runtime. Fastify uses abstract-logging for this purpose.

Enabling the logger:

```node
const fastify = require('fastify')({
  logger: true
})
```

https://www.fastify.io/docs/latest/Logging/
