import { isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

interface AppointmentDTO {
  provider: String;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public list() {
    return this.appointments;
  }

  public create(appointment: AppointmentDTO) {
    const { provider, date } = appointment;

    const createdAppointment = new Appointment({ provider, date });

    this.appointments.push(createdAppointment);

    return createdAppointment;
  }

  public findByDate(date: Date) {
    const foundRepository = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return foundRepository || null;
  }
}

export default AppointmentsRepository;
