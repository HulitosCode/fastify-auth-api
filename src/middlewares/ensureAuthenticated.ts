import type { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export function ensureAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return reply.status(401).send({ message: 'Token missing' })
  }
  // verificar se o token é válido
  const [, token] = authToken.split(' ')

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as IPayload
    request.user = { id: decoded.sub }
  } catch (err) {
    return reply.status(401).send({ message: 'Invalid token' })
  }
}