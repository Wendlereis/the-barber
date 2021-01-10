import { Router } from 'express';

import appointments from '@modules/appointments/infra/http/routes/appointmentsRoute';
import users from '@modules/users/infra/http/routes/usersRoute';
import sessions from '@modules/users/infra/http/routes/sessionsRoute';

const routes = Router();

routes.use('/users', users);
routes.use('/appointments', appointments);
routes.use('/sessions', sessions);

routes.use('/health', (_, response) => response.json({ ok: true }));

export default routes;
