import CreateScheduleService from '@modules/schedules/services/CreateScheduleService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SchedulesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body;

    const createSchedule = container.resolve(CreateScheduleService);

    const schedule = await createSchedule.execute({
      userId,
    });

    return response.json(schedule);
  }
}

export default SchedulesController;
