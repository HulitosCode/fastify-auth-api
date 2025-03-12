import type { FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

interface IBody {
  email: string
  password: string
}
export class AuthenticateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as IBody

    const authenticateUserUseCase = new AuthenticateUserUseCase()

    const token = await authenticateUserUseCase.execute({ email, password })
    return reply.status(200).send({ token })
  }
}
