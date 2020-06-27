import { Router } from 'express';

import users from './users';
import appointments from './appointments';
import sessions from './sessions';

const routes = Router();

routes.use('/users', users);
routes.use('/appointments', appointments);
routes.use('/sessions', sessions);

export default routes;
