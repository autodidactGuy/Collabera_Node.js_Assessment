import { User, IUser } from '../models/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface AuthUser{
    token: string;
}

export class UserService {
    async login(username: string, password: string): Promise<AuthUser | null> {
        try {
            const user: IUser | null = await User.findOne({username: username});
            if(user && bcrypt.compareSync(password, user.password)) {
                const token=jwt.sign({username: user.username}, process.env.JWT_PASSWORD!, {expiresIn: 3600});
                const authUser = {
                    token: token
                }
                return authUser;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    async register(userData: IUser): Promise<IUser> {
        try {
            userData.password = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(10));
            const user = new User(userData);
            return user.save();
        } catch (error) {
            throw error;
        }
    }
}