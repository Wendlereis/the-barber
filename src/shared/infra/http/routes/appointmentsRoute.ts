import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../../../../modules/appointments/infra/typeorm/Appointment';

import AppointmentsRepository from '../../../../modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../../modules/appointments/services/CreateAppointmentService';

import sessionMiddleware from '../middlewares/sessionMiddleware';

const router = Router();

router.use(sessionMiddleware);

router.get('/', async (_, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.status(200).json(appointments);
});

router.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const createAppointmentsService = new CreateAppointmentService();

  const parsedDate = parseISO(date);

  const appointment = await createAppointmentsService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.status(201).json(appointment);
});

export default router;
