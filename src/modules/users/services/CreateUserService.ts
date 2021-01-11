import { hash } from 'bcryptjs';

import AppError from '@shared/exceptions/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private userRepository: IUsersRepository) {}

  async execute(userRequest: IUserRequest) {
    const { name, email, password } = userRequest;

    const hasUser = await this.userRepository.findByEmail(email);

    if (hasUser) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
