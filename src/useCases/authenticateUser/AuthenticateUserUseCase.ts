import { compare } from 'bcrypt'
import { prisma } from '../../database/prisma'
import { sign } from 'jsonwebtoken'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'

interface IRequest {
  email: string
  password: string
}

export class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {
    //Verificar se o usuário existe

    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!userAlreadyExists) {
      throw new Error('Email or password incorrect')
    }

    // Verificar se a senha esta correta

    const passwordMatch = await compare(password, userAlreadyExists.password)

    if (!passwordMatch) {
      throw new Error('Email or password incorrect')
    }

    // gerar token de usuario

    const token = sign({}, process.env.JWT_SECRET!, {
      subject: userAlreadyExists.id,
      expiresIn: '1d',
    })

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id)
    return { token, refreshToken }
  }
}
