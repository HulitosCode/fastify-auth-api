import fastify from 'fastify'
import { rootRoutes } from './src/routes/route'

const server = fastify()


// Middleware de tratamento de erros
server.setErrorHandler((error, request, reply) => {
  console.error('Erro inesperado:', error)

  return reply.status(500).send({
    message: 'Erro interno do servidor',
    error: error.message,
  })
})

// Registra as rotas da pasta 'routes'
server.register(rootRoutes)

server.listen({
  port: 8000,
})
