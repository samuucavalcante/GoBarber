import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/AppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '231321312',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('231321312');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '231321312',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '231321312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
