import { isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public list() {
    return this.appointments;
  }

  public create(provider: String, date: Date) {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date) {
    const foundRepository = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return foundRepository || null;
  }
}

export default AppointmentsRepository;
