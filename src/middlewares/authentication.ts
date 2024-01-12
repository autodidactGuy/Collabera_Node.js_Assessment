import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_PASSWORD!;

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(parseInt(process.env.ERROR_FORBIDDEN_CODE!)).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.body.user = decoded;
    } catch (err) {
        return res.status(parseInt(process.env.ERROR_UNAUTHORIZED_CODE!)).send('Invalid Token');
    }

    return next();
};
