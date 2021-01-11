import { Request, Response } from "express";
import { parseISO } from 'date-fns';

import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response) {
    const { provider_id, date } = request.body;

    const createAppointmentsService = container.resolve(CreateAppointmentService)

    const parsedDate = parseISO(date);

    const appointment = await createAppointmentsService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  }
}

export default AppointmentsController
