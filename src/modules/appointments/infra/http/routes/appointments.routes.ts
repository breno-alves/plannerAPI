import { Router } from 'express';
import AppointmentController from '@modules/appointments/infra/controller/AppointmentsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.post('/', ensureAuthenticated, appointmentController.create);

appointmentRouter.get(
  '/list/:scheduleId',
  ensureAuthenticated,
  appointmentController.list,
);

appointmentRouter.delete(
  '/',
  ensureAuthenticated,
  appointmentController.delete,
);

export default appointmentRouter;
