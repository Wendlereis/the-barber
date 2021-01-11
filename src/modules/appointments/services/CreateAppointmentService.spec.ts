import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository'

import CreateAppointmentService from './CreateAppointmentService'

describe('CreateAppointmentService', () => {
  describe('Create Appointment', () => {
    test('should be able to a new appointment', async () => {
      const fakeAppointmentsRepository = new FakeAppointmentsRepository()

      const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository)

      const appointmentResult = await createAppointmentService.execute({
        date: new Date(),
        provider_id: '123'
      })

      expect(appointmentResult).toHaveProperty('id')
    })

    test('should not be able to create two appointment in same schedule', () => {
      expect(true).toBe(true);
    })
  })
})
