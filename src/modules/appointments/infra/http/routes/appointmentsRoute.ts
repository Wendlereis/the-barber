import { Router } from 'express';
import { parseISO } from 'date-fns';

import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import sessionMiddleware from '@modules/users/infra/http/middlewares/sessionMiddleware';

const router = Router();

router.use(sessionMiddleware);

// router.get('/', async (_, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);

//   const appointments = await appointmentsRepository.find();

//   return response.status(200).json(appointments);
// });

router.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const createAppointmentsService = container.resolve(CreateAppointmentService)

  const parsedDate = parseISO(date);

  const appointment = await createAppointmentsService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.status(201).json(appointment);
});

export default router;
