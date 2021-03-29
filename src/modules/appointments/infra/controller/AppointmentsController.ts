import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { scheduleId, name, weekDay, userId } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      scheduleId,
      name,
      weekDay,
      userId,
    });

    return response.json(appointment);
  }
}

export default AppointmentsController;
