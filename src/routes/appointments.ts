import { Router } from 'express';
import { parseISO } from 'date-fns';

import Appointment from '../models/Appointments';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const router = Router();

const appointmentsRepository = new AppointmentsRepository();

router.get('/', (_, response) => {
  const appointments = appointmentsRepository.list();
  return response.status(200).json(appointments);
});

router.post('/', (request, response) => {
  const { provider, date } = request.body;

  const createAppointmentsService = new CreateAppointmentService(
    appointmentsRepository,
  );

  const parsedDate = parseISO(date);

  try {
    const appointment = createAppointmentsService.execute({
      provider,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default router;
