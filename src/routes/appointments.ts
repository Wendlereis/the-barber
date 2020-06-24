import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointments';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const router = Router();

const appointmentRepository = new AppointmentsRepository();

router.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentRepository.create(provider, parsedDate);

  return response.status(201).json(appointment);
});

export default router;
