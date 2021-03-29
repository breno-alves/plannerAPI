import { injectable, inject } from 'tsyringe';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ICreateScheduleDTO from '../dtos/ICreateScheduleDTO';
import Schedule from '../infra/typeorm/entities/Schedule';

@injectable()
class CreateScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    this.schedulesRepository = schedulesRepository;
    this.usersRepository = usersRepository;
  }

  public async execute({ userId }: ICreateScheduleDTO): Promise<Schedule> {
    const checkUserExists = await this.usersRepository.findById(userId);

    if (!checkUserExists) {
      throw new AppError('User not found!');
    }

    const schedule = await this.schedulesRepository.create({
      userId,
    });

    return schedule;
  }
}

export default CreateScheduleService;
