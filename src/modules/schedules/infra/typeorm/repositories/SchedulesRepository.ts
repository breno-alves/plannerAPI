import { getRepository, Repository } from 'typeorm';

import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';
import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import Schedule from '../entities/Schedule';

class SchedulesRepository implements ISchedulesRepository {
  private schedulesRepository: Repository<Schedule>;

  constructor() {
    this.schedulesRepository = getRepository(Schedule);
  }

  public async findById(id: string): Promise<Schedule | undefined> {
    return this.schedulesRepository.findOne(id);
  }

  public async create(data: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = this.schedulesRepository.create(data);
    await this.schedulesRepository.save(schedule);
    return schedule;
  }

  public async save(schedule: Schedule): Promise<Schedule> {
    return this.schedulesRepository.save(schedule);
  }
}

export default SchedulesRepository;
