import mongoose from 'mongoose';

const MONGODB_URI = process.env.DB_URI;

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI ?? "mongodb://127.0.0.1:27017/collaberaCustomers");
        console.log('Connected successfully to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};

export const disconnectDB = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Failed to disconnect from MongoDB', error);
        process.exit(1);
    }
};
