class Appointment {
  id: Number;
  provider: String;
  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = new Date().getTime();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
