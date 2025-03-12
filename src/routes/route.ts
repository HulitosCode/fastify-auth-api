import type { FastifyInstance } from 'fastify'
import { CreateUserController } from '../useCases/createUser/CreateUserController'
import { AuthenticateUserController } from '../useCases/authenticateUser/AuthenticateUserController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

export async function rootRoutes(fastify: FastifyInstance) {
  fastify.post('/users', async (request, reply) => {
    return createUserController.handle(request, reply)
  })

  fastify.post('/login', async (request, reply) => {
    return authenticateUserController.handle(request, reply)
  })

  fastify.get(
    '/courses',
    { preHandler: ensureAuthenticated },
    async (request, reply) => {
      console.log('Usuário na rota /courses:', request.user); // Log para depuração
      return reply.send({
        userId: request.user.id, 
        courses: [
          { id: 1, name: 'NodeJS' },
          { id: 2, name: 'ReactJS' },
          { id: 3, name: 'React Native' }
        ],
      });
    }
  );
}