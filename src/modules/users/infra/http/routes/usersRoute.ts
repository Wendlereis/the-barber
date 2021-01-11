import { Router } from 'express';
import multer from 'multer';

import fileUploadConfig from '@config/fileUpload';

import sessionMiddleware from '@modules/users/infra/http/middlewares/sessionMiddleware';

import UsersController from '../controllers/UsersControllers';
import UserAvatarController from '../controllers/UserAvatarController';

const router = Router();
const fileUpload = multer(fileUploadConfig);

const userController = new UsersController()
const userAvatarController = new UserAvatarController()

router.post('/', userController.create);

router.patch(
  '/avatar',
  sessionMiddleware,
  fileUpload.single('avatar'),
  userAvatarController.update,
);

export default router;
