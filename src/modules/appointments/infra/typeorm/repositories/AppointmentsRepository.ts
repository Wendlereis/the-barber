import { getRepository, Repository } from 'typeorm';

import IAppointnebtsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointnebtsRepository {
  private ormRepositorory: Repository<Appointment>;

  constructor() {
    this.ormRepositorory = getRepository(Appointment)
  }

  public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepositorory.create({ provider_id, date })

    await this.ormRepositorory.save(appointment)

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = await this.ormRepositorory.findOne({
      where: { date },
    });

    return foundAppointment;
  }
}

export default AppointmentsRepository;
