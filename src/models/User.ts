import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    userType: string;
}

const UserSchema: Schema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType:{
        type: String,
        default: process.env.DEFAULT_USER_TYPE
    }
});

export const User = mongoose.model<IUser>('User', UserSchema);
