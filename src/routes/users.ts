import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const router = Router();

router.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  try {
    const { id, created_at, updated_at } = await createUserService.execute({
      name,
      email,
      password,
    });

    response.status(201).json({ id, name, email, created_at, updated_at });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

export default router;
