import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe'
import IAppointnebtsRepository from '../repositories/IAppointmentsRepository';

import AppError from '@shared/exceptions/AppError';

interface ICreateAppointmentDTO {
  provider_id: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointnebtsRepository
  ) {}

  public async execute({ provider_id, date }: ICreateAppointmentDTO) {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
