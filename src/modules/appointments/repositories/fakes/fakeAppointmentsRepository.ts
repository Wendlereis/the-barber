import { uuid } from 'uuidv4'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import IAppointnebtsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';

class FakeAppointmentsRepository implements IAppointnebtsRepository {
  private appointments: Appointment[] = []

  public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    appointment.id = uuid()
    appointment.provider_id = provider_id
    appointment.date = date

    this.appointments.push(appointment)

    return appointment
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(appointment => appointment.date === date)
  }
}

export default FakeAppointmentsRepository;
