import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

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

  public async list(request: Request, response: Response): Promise<Response> {
    const { scheduleId } = request.params;

    const listAppointments = container.resolve(ListAppointmentsService);

    const appointments = await listAppointments.execute(scheduleId);

    return response.json(appointments);
  }
}

export default AppointmentsController;
