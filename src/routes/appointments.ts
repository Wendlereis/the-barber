import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointments';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const router = Router();

const appointmentsRepository = new AppointmentsRepository();

router.get('/', (request, response) => {
  const appointments = appointmentsRepository.list();
  return response.status(200).json(appointments);
});

router.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return response.status(201).json(appointment);
});

export default router;
