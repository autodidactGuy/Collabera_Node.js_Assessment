import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {
    async login(req: Request, res: Response) {
        try {
            const { username, password} = req.body;
            const user = await userService.login(username, password);
            res.status(parseInt(process.env.OK_STATUS_CODE!)).json(user);
        } catch (error) {
            res.status(parseInt(process.env.INTERNAL_SERVER_ERROR_CODE!)).send(error);
        }
    }

    async register(req: Request, res: Response) {
        try {
            const newUser = await userService.register(req.body);
            res.status(parseInt(process.env.OK_POST_CODE!)).json(newUser);
        } catch (error) {
            res.status(parseInt(process.env.INTERNAL_SERVER_ERROR_CODE!)).send(error);
        }
    }
}