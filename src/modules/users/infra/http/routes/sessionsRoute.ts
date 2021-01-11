import { Router } from 'express';
import { container } from 'tsyringe'

import CreateSessionService from '@modules/users/services/CreateSessionService';

const router = Router();


router.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSessionService = container.resolve(CreateSessionService);

  const { user, token } = await createSessionService.execute({
    email,
    password,
  });

  return response.status(200).json({ user, token });
});

export default router;
