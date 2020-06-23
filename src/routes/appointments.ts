import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointments';

const router = Router();

const appointments: Appointment[] = [];

router.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(appointment.date, parsedDate),
  );

  if (findAppointmentInSameDate) {
    response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = new Appointment(provider, parsedDate)

  appointments.push(appointment);

  return response.status(201).json(appointment);
});

export default router;
