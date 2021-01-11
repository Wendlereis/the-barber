import fs from 'fs';
import path from 'path';
import { injectable, inject } from 'tsyringe'

import fileUploadConfig from '@config/fileUpload';

import AppError from '@shared/exceptions/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async execute(request: IRequest) {
    const user = await this.userRepository.findById(request.userId);

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

    await this.userRepository.save(updatedUserWithAvatar);

    return updatedUserWithAvatar;
  }
}

export default UpdateUserAvatarService;
