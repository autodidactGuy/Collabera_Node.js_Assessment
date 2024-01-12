import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const validateUser = [
    body('name').isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('username').isAlphanumeric().withMessage('username should be alphanumeric'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be more than 6 characters'),
];

const checkValidationResult = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(parseInt(process.env.ERROR_BAD_REQUEST_CODE!)).json({ errors: errors.array() });
    }
    next();
};

export {
    validateUser,
    checkValidationResult
}