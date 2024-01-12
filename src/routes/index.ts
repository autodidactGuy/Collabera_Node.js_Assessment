import { Router } from 'express';
import customerRouter from '../routes/customerRouter';
import userRouter from '../routes/userRouter';

const router = Router();

router.use('/customers', customerRouter);
router.use('/users', userRouter);

export default router;