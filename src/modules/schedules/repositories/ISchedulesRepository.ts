import CreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';
import Schedule from '../infra/typeorm/entities/Schedule';

export default interface ISchedulesRepository {
  create(data: CreateScheduleDTO): Promise<Schedule>;
  findById(id: string): Promise<Schedule | undefined>;
  save(schedule: Schedule): Promise<Schedule>;
}
