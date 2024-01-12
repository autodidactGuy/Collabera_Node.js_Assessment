import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
    name: string;
    email: string;
    // other fields...
}

const CustomerSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    // other fields...
});

export const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);
