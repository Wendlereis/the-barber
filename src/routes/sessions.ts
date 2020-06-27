import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const router = Router();

router.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSessionService = new CreateSessionService();

  try {
    const { user, token } = await createSessionService.execute({ email, password });
    return response.status(200).json({ user, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default router;
