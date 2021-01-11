import { Router } from 'express';

import sessionMiddleware from '@modules/users/infra/http/middlewares/sessionMiddleware';

import AppointmentsController from '../controllers/AppointmentsController';

const router = Router();

router.use(sessionMiddleware);

const appointmentsController = new AppointmentsController()

router.post('/', appointmentsController.create);

export default router;
