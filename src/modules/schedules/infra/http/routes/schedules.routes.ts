import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import SchedulesController from '@modules/schedules/infra/controller/SchedulesController';

const scheduleRouter = Router();
const schedulesController = new SchedulesController();

scheduleRouter.post('/', ensureAuthenticated, schedulesController.create);

export default scheduleRouter;
