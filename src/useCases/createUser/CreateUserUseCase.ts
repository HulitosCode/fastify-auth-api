import { prisma } from '../../database/prisma'
import bcrypt from 'bcrypt'

interface IUserRequest {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  async execute({ name, email, password }: IUserRequest) {
    // Verificar se usuario existe
    const userAlreadyExistis = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (userAlreadyExistis) {
      throw new Error('User already exists!')
    }

    // Cadastrar usuario
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    })
    return user
  }
}
