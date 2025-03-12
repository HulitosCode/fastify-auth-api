import type { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserUseCase } from './CreateUserUseCase'

interface ICreateRequest {
  name: string
  email: string
  password: string
}

export class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as ICreateRequest

    const createUserUseCase = new CreateUserUseCase()

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send(user)
  }
}
