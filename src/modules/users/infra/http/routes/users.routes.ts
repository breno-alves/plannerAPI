import { Router } from 'express';

import UserController from '@modules/users/infra/controller/UsersController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.create);

// userRouter.get('/', ensureAuthenticated, userController.index);

export default userRouter;
