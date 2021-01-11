import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/exceptions/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface ISessionRequest {
  email: string;
  password: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async execute(sessionRequest: ISessionRequest) {
    const { email, password } = sessionRequest;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email or password', 401);
    }

    const token = sign({}, process.env.JWT_TOKEN, {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
