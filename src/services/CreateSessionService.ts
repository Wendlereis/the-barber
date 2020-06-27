import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Users from '../models/Users';
import User from '../models/Users';

interface SessionRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute(sessionRequest: SessionRequest) {
    const { email, password } = sessionRequest;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw Error('Incorrect email or password');
    }

    const passwordMatched = compare(password, user.password);

    if (!passwordMatched) {
      throw Error('Incorrect email or password');
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
