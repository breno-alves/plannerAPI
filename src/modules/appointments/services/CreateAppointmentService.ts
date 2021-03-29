import { injectable, inject } from 'tsyringe';
import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import AppError from '@shared/errors/AppError';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
class CreateAppointmentService {
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
    name,
    scheduleId,
    userId,
    weekDay,
    duration,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const checkScheduleExists = await this.schedulesRepository.findById(
      scheduleId,
    );

    if (!checkScheduleExists) {
      throw new AppError('Schedule not found!');
    }

    const appointment = await this.appointmentsRepository.create({
      name,
      scheduleId,
      userId,
      weekDay,
      duration,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
