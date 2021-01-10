import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/exceptions/AppError';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute(userRequest: UserRequest) {
    const { name, email, password } = userRequest;

    const userRepository = getRepository(User);

    const hasUser = await userRepository.findOne({ where: { email } });

    if (hasUser) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
