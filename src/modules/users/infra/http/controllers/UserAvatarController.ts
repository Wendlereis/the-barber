import { Request, Response } from "express";
import { container } from 'tsyringe'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UserAvatarController {
  public async update(request: Request, response: Response) {
    const { user, file } = request;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const updatedUser = await updateUserAvatarService.execute({
      userId: user.id,
      avatarFileName: file.filename,
    });

    return response.json(updatedUser);
  }
}

export default UserAvatarController
