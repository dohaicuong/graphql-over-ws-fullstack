import Fastify from 'fastify'
import fastifyWebsocket from 'fastify-websocket'

import { graphqlSchema } from './gql'

const fastify = Fastify()
fastify.register(fastifyWebsocket)

fastify.get(
  '/graphql',
  { websocket: true },
  connection => graphqlSchema(connection.socket)
)

fastify.listen(4000, (err) => {
  if(err) {
    fastify.log.error(err)
    return process.exit(1)
  }

  console.log('Listening to port 4000')
})