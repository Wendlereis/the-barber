import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe'

import fileUploadConfig from '@config/fileUpload';

import sessionMiddleware from '@modules/users/infra/http/middlewares/sessionMiddleware';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const router = Router();
const fileUpload = multer(fileUploadConfig);

router.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = container.resolve(CreateUserService);

  const { id, created_at, updated_at } = await createUserService.execute({
    name,
    email,
    password,
  });

  response.status(201).json({ id, name, email, created_at, updated_at });
});

router.patch(
  '/avatar',
  sessionMiddleware,
  fileUpload.single('avatar'),
  async (request, response) => {
    const { user, file } = request;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const updatedUser = await updateUserAvatarService.execute({
      userId: user.id,
      avatarFileName: file.filename,
    });

    return response.json(updatedUser);
  },
);

export default router;
