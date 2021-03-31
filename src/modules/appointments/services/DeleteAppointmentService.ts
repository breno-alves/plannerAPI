import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  appointmentId: string;
  scheduleId: string;
  userId: string;
}

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
    this.schedulesRepository = schedulesRepository;
  }

  public async execute({
    appointmentId,
    scheduleId,
    userId,
  }: IRequestDTO): Promise<{ message: string }> {
    const scheduleExists = await this.schedulesRepository.findById(scheduleId);

    if (!scheduleExists || scheduleExists.userId !== userId) {
      throw new AppError('Schedule does not exists, or not owned by this user');
    }

    const appointment = await this.appointmentsRepository.findById(
      appointmentId,
    );

    if (!appointment) {
      throw new AppError('Appointment not found!');
    }

    await this.appointmentsRepository.delete(appointment.id);

    return { message: 'ok' };
  }
}

export default DeleteAppointmentService;
