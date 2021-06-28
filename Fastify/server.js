// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
  })
  
  // Azure will set the enviroment variable PORT to 8080 
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