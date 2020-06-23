class Appointment {
  id: Number;
  provider: String;
  date: Date;

  constructor(provider: String, date: Date) {
    this.id = new Date().getTime();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
