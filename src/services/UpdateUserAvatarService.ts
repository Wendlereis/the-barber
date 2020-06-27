import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';

import User from '../models/User';

import fileUploadConfig from '../config/fileUpload';
import AppError from '../exceptions/AppError';

interface Request {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute(request: Request) {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(request.userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar',);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(
        fileUploadConfig.destination,
        user.avatar,
      );
      const userAvatarFileFound = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileFound) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    const updatedUserWithAvatar = { ...user, avatar: request.avatarFileName };

    await usersRepository.save(updatedUserWithAvatar);

    return updatedUserWithAvatar;
  }
}

export default UpdateUserAvatarService;
