import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const router = Router();

const sessionController = new SessionsController()

router.post('/', sessionController.create);

export default router;
