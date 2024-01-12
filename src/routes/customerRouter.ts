import { Router } from 'express';
import { CustomerController } from '../controllers/customerController';
import { auth } from '../middlewares/authentication';
import { validateCustomer, checkValidationResult } from '../middlewares/customerValidation';

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.get('/', customerController.getAll);

customerRouter.get('/:id', customerController.getOneById);

customerRouter.post('/', auth, validateCustomer, checkValidationResult, customerController.createOne);

customerRouter.put('/:id', auth, validateCustomer, checkValidationResult, customerController.updateOne);

customerRouter.delete('/:id', auth, customerController.deleteOne);

export default customerRouter;