import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
class ListAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
    this.schedulesRepository = schedulesRepository;
  }

  public async execute(scheduleId: string): Promise<Appointment[] | []> {
    const checkScheduleExists = await this.schedulesRepository.findById(
      scheduleId,
    );

    console.log(checkScheduleExists);

    if (!checkScheduleExists) {
      throw new AppError('Schedule not found!');
    }

    const appointments = await this.appointmentsRepository.findAll(scheduleId);

    return appointments;
  }
}

export default ListAppointmentsService;
