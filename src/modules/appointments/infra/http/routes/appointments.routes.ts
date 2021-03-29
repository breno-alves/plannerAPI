import { Router } from 'express';
import AppointmentController from '@modules/appointments/infra/controller/AppointmentsController';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.post('/', appointmentController.create);
appointmentRouter.get('/list/:scheduleId', appointmentController.list);

export default appointmentRouter;
