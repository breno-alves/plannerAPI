import { Router } from 'express';

import SessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import UserRouter from '@modules/users/infra/http/routes/users.routes';
import ScheduleRouter from '@modules/schedules/infra/http/routes/schedules.routes';
import AppointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';

const routes = Router();

routes.use('/sessions', SessionRouter);
routes.use('/users', UserRouter);
routes.use('/schedules', ScheduleRouter);
routes.use('/appointments', AppointmentRouter);

export default routes;
