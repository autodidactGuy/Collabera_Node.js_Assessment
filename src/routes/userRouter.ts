import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { validateUser, checkValidationResult } from '../middlewares/userValidation';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/login', userController.login)
userRouter.post('/', validateUser, checkValidationResult, userController.register)

export default userRouter;