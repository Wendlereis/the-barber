import { Router } from 'express';

import users from './usersRoute';
import appointments from './appointmentsRoute';
import sessions from './sessionsRoute';

const routes = Router();

routes.use('/users', users);
routes.use('/appointments', appointments);
routes.use('/sessions', sessions);

export default routes;
