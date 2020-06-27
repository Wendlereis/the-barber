import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointments';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import sessionMiddleware from '../middlewares/session';

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

  try {
    const appointment = await createAppointmentsService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default router;
