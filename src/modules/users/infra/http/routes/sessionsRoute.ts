import { Router } from 'express';

import CreateSessionService from '@modules/users/services/CreateSessionService';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const router = Router();


router.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository()

  const createSessionService = new CreateSessionService(usersRepository);

  const { user, token } = await createSessionService.execute({
    email,
    password,
  });

  return response.status(200).json({ user, token });
});

export default router;
